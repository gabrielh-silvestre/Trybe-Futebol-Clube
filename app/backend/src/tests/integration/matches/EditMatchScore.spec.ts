import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import type {
  MatchAttributes,
  MatchUpdate,
  UserTokenData,
} from '../../../@types/types';

import MatchModel from '../../../database/models/MatchModel';
import MatchesRepository from '../../../modules/matches/repository';
import AuthService from '../../../services/Auth';

import { app } from '../../../app';

import { users } from '../../mock/users';
import { matches } from '../../mock/matches';

chai.use(chaiHttp);
const { expect } = chai;

const [admin] = users;

const MATCH_UPDATE: MatchUpdate = {
  homeTeamGoals: 2,
  awayTeamGoals: 3,
};

const UPDATED_MATCH: MatchAttributes = {
  ...matches[0],
  ...MATCH_UPDATE,
};

const MOCK_TOKEN_DATA: UserTokenData = admin;

const MOCK_TOKEN = AuthService.generate(MOCK_TOKEN_DATA);

describe('Test endpoint PATCH /matches/:id', () => {
  let matchesRepositoryStub: sinon.SinonStub;
  let matchModelStub: sinon.SinonStub;

  describe('1. Success case', () => {
    before(() => {
      matchesRepositoryStub = sinon
        .stub(MatchesRepository.prototype, 'update')
        .resolves(UPDATED_MATCH);

      matchModelStub = sinon
        .stub(MatchModel, 'findByPk')
        .resolves(matches[0] as unknown as MatchModel);
    });

    after(() => {
      matchesRepositoryStub.restore();
      matchModelStub.restore();
    });

    it('should return 200 and updated match', async () => {
      const response = await chai
        .request(app)
        .patch(`/matches/${matches[0].id}`)
        .set('Authorization', MOCK_TOKEN)
        .send(MATCH_UPDATE);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('homeTeam');
      expect(response.body).to.have.property('homeTeamGoals');
      expect(response.body).to.have.property('awayTeam');
      expect(response.body).to.have.property('awayTeamGoals');
      expect(response.body).to.have.property('inProgress');
    });
  });

  describe('2. Fail case', () => {
    before(() => {
      matchesRepositoryStub = sinon
        .stub(MatchesRepository.prototype, 'update')
        .rejects(new Error('Test error'));

      matchModelStub = sinon.stub(MatchModel, 'findByPk').resolves(null);
    });

    after(() => {
      matchesRepositoryStub.restore();
      matchModelStub.restore();
    });

    it('when token is invalid', async () => {
      const response = await chai
        .request(app)
        .patch(`/matches/${matches[0].id}`)
        .set('Authorization', 'invalid token')
        .send(MATCH_UPDATE);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: 'Invalid token',
      });
    });

    it('when token is not provided', async () => {
      const response = await chai
        .request(app)
        .patch(`/matches/${matches[0].id}`)
        .send(MATCH_UPDATE);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: 'Invalid token',
      });
    });

    it('when requisition body is without "homeTeamGoals" property', async () => {
      const response = await chai
        .request(app)
        .patch(`/matches/${matches[0].id}`)
        .set('Authorization', MOCK_TOKEN)
        .send({
          awayTeamGoals: 3,
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: '"homeTeamGoals" is required',
      });
    });

    it('when requisition body is without "awayTeamGoals" property', async () => {
      const response = await chai
        .request(app)
        .patch(`/matches/${matches[0].id}`)
        .set('Authorization', MOCK_TOKEN)
        .send({
          homeTeamGoals: 2,
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: '"awayTeamGoals" is required',
      });
    });

    it('when "homeTeamGoals" is not a number', async () => {
      const response = await chai
        .request(app)
        .patch(`/matches/${matches[0].id}`)
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_UPDATE,
          homeTeamGoals: 'a',
        });

      expect(response.status).to.equal(422);
      expect(response.body).to.deep.equal({
        message: '"homeTeamGoals" must be a number',
      });
    });

    it('when "awayTeamGoals" is not a number', async () => {
      const response = await chai
        .request(app)
        .patch(`/matches/${matches[0].id}`)
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_UPDATE,
          awayTeamGoals: 'a',
        });

      expect(response.status).to.equal(422);
      expect(response.body).to.deep.equal({
        message: '"awayTeamGoals" must be a number',
      });
    });

    it('when "homeTeamGoals" is less than 0', async () => {
      const response = await chai
        .request(app)
        .patch(`/matches/${matches[0].id}`)
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_UPDATE,
          homeTeamGoals: -1,
        });

      expect(response.status).to.equal(422);
      expect(response.body).to.deep.equal({
        message: '"homeTeamGoals" must be greater than or equal to 0',
      });
    });

    it('when "awayTeamGoals" is less than 0', async () => {
      const response = await chai
        .request(app)
        .patch(`/matches/${matches[0].id}`)
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_UPDATE,
          awayTeamGoals: -1,
        });

      expect(response.status).to.equal(422);
      expect(response.body).to.deep.equal({
        message: '"awayTeamGoals" must be greater than or equal to 0',
      });
    });

    it('when match is not found', async () => {
      const response = await chai
        .request(app)
        .patch(`/matches/999`)
        .set('Authorization', MOCK_TOKEN)
        .send(MATCH_UPDATE);

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: 'Match not found',
      });
    });

    it('when a unexpected error occurs', async () => {
      matchModelStub.resolves(matches[0] as unknown as MatchModel);

      const response = await chai
        .request(app)
        .patch(`/matches/${matches[0].id}`)
        .set('Authorization', MOCK_TOKEN)
        .send(MATCH_UPDATE);

      expect(response.status).to.equal(500);
      expect(response.body).to.deep.equal({
        message: 'Internal server error',
      });
    });
  });
});
