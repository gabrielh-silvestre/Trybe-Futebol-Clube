import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import LeaderBoardRepository from '../../../modules/leaderboard/repository';

import { app } from '../../../app';

import { board } from '../../mock/leaderboards';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test endpoint GET /leaderboard/away', () => {
  let repositoryStub: sinon.SinonStub;

  describe('1. Success cas', () => {
    before(() => {
      repositoryStub = sinon
        .stub(LeaderBoardRepository.prototype, 'getAll')
        .resolves(board);
    });

    after(() => {
      repositoryStub.restore();
    });

    it('should return 200 and leaderboard data', async () => {
      const response = await chai.request(app).get('/leaderboard/away');

      expect(response.status).to.equal(200);

      expect(response.body).to.be.an('array');

      expect(response.body[0]).to.be.an('object');
      expect(response.body[0]).to.have.property('name');
      expect(response.body[0]).to.have.property('totalPoints');
      expect(response.body[0]).to.have.property('totalGames');
      expect(response.body[0]).to.have.property('totalVictories');
      expect(response.body[0]).to.have.property('totalDraws');
      expect(response.body[0]).to.have.property('totalLosses');
      expect(response.body[0]).to.have.property('goalsFavor');
      expect(response.body[0]).to.have.property('goalsOwn');
      expect(response.body[0]).to.have.property('goalsBalance');
      expect(response.body[0]).to.have.property('efficiency');
    });
  });

  describe('2. Fail case', () => {
    before(() => {
      repositoryStub = sinon
        .stub(LeaderBoardRepository.prototype, 'getAll')
        .rejects(new Error('Test error'));
    });

    after(() => {
      repositoryStub.restore();
    });

    it('when a unexpected error occurs', async () => {
      const response = await chai.request(app).get('/leaderboard/home');

      expect(response.status).to.equal(500);
      expect(response.body).to.deep.equal({
        message: 'Internal server error',
      });
    });
  });
});
