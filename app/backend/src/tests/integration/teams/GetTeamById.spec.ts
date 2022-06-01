import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import TeamsRepository from '../../../modules/teams/repository';

import { app } from '../../../app';

import { teams } from '../../mock/teams';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test endpoint GET /teams/:id', () => {
  let repositoryStub: sinon.SinonStub;

  describe('1. Success case', () => {
    before(() => {
      repositoryStub = sinon
        .stub(TeamsRepository.prototype, 'findById')
        .resolves(teams[0]);
    });

    after(() => {
      repositoryStub.restore();
    });

    it('should return 200 and team data', async () => {
      const response = await chai.request(app).get('/teams/1');

      expect(response.status).to.equal(200);

      expect(response.body).to.be.an('object');

      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('teamName');
    });
  });

  describe('2. Fail case', () => {
    before(() => {
      repositoryStub = sinon.stub(TeamsRepository.prototype, 'findById');

      repositoryStub.onCall(0).resolves(null);
      repositoryStub.onCall(1).rejects(new Error('Test error'));
    });

    after(() => {
      repositoryStub.restore();
    });

    it('when the team does not exist', async () => {
      const response = await chai.request(app).get('/teams/47');

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: 'Team not found',
      });
    });

    it('when a unexpected error occurs', async () => {
      const response = await chai.request(app).get('/teams/1');

      expect(response.status).to.equal(500);
      expect(response.body).to.deep.equal({
        message: 'Internal server error',
      });
    });
  });
});
