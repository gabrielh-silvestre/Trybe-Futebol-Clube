import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import MatchesRepository from '../../../modules/matches/repository';

import { app } from '../../../app';

import { matches } from '../../mock/matches';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test endpoint GET /matches?inProgress=', () => {
  let repositoryStub: sinon.SinonStub;

  describe('1. Success case', () => {
    before(() => {
      repositoryStub = sinon.stub(MatchesRepository.prototype, 'findAll');

      repositoryStub.onCall(0).resolves([]);
      repositoryStub.onCall(1).resolves(matches);
    });

    after(() => {
      repositoryStub.restore();
    });

    it('when search by in progress matches', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true');

      expect(response.status).to.equal(200);

      expect(response.body).to.be.an('array');
    });

    it('when search by finished matches', async () => {
      const response = await chai.request(app).get('/matches?inProgress=false');

      expect(response.status).to.equal(200);

      expect(response.body).to.be.an('array');

      expect(response.body[0]).to.be.an('object');
      expect(response.body[0]).to.have.property('id');
      expect(response.body[0]).to.have.property('homeTeam');
      expect(response.body[0]).to.have.property('homeTeamGoals');
      expect(response.body[0]).to.have.property('awayTeam');
      expect(response.body[0]).to.have.property('awayTeamGoals');
      expect(response.body[0]).to.have.property('inProgress');
      expect(response.body[0]).to.have.property('teamHome');
      expect(response.body[0]).to.have.property('teamAway');

      expect(response.body[0].inProgress).to.be.false;
    });
  });

  describe('2. Fail case', () => {
    before(() => {
      repositoryStub = sinon
        .stub(MatchesRepository.prototype, 'findAll')
        .rejects(new Error('Test error'));
    });

    after(() => {
      repositoryStub.restore();
    });

    it('when a unexpected error occurs', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true');

      expect(response.status).to.equal(500);
      expect(response.body).to.deep.equal({
        message: 'Internal server error',
      });
    });
  });
});
