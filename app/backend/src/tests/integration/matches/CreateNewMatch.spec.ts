import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import type {
  MatchAttributes,
  MatchCreation,
  UserTokenData,
} from '../../../@types/types';

import TeamModel from '../../../database/models/TeamModel';
import MatchesRepository from '../../../modules/matches/repository';
import AuthService from '../../../services/Auth';

import { app } from '../../../app';

import { users } from '../../mock/users';

chai.use(chaiHttp);
const { expect } = chai;

const [admin] = users;

// TODO: after finish o trybe evaluator, remove inProgress for match creation
const MATCH_CREATION: MatchCreation = {
  homeTeam: 2,
  homeTeamGoals: 2,
  awayTeam: 3,
  awayTeamGoals: 3,
  inProgress: true,
};

const NEW_MATCH: MatchAttributes = {
  id: 11,
  ...MATCH_CREATION,
};

const MOCK_TOKEN_DATA: UserTokenData = admin;

const MOCK_TOKEN = AuthService.generate(MOCK_TOKEN_DATA);

describe('Test endpoint POST /matches', () => {
  let matchesRepositoryStub: sinon.SinonStub;
  let teamModelStub: sinon.SinonStub;

  describe('1. Success case', () => {
    before(() => {
      matchesRepositoryStub = sinon
        .stub(MatchesRepository.prototype, 'create')
        .resolves(NEW_MATCH);

      teamModelStub = sinon
        .stub(TeamModel, 'findByPk')
        .resolves(NEW_MATCH as unknown as TeamModel);
    });

    after(() => {
      matchesRepositoryStub.restore();
      teamModelStub.restore();
    });

    it('should return status 201 and match data', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send(MATCH_CREATION);

      expect(response.status).to.equal(201);

      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('homeTeam');
      expect(response.body).to.have.property('homeTeamGoals');
      expect(response.body).to.have.property('awayTeam');
      expect(response.body).to.have.property('awayTeamGoals');
      expect(response.body).to.have.property('inProgress');

      expect(response.body.inProgress).to.be.true;
    });
  });

  describe('2. Fail case', () => {
    before(() => {
      matchesRepositoryStub = sinon
        .stub(MatchesRepository.prototype, 'create')
        .rejects(new Error('Test error'));

      teamModelStub = sinon.stub(TeamModel, 'findByPk');
      teamModelStub.resolves(null);
    });

    after(() => {
      matchesRepositoryStub.restore();
      teamModelStub.restore();
    });

    it('when token is invalid', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', 'invalid token')
        .send(MATCH_CREATION);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: 'Invalid token',
      });
    });

    it('when token is not provided', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .send(MATCH_CREATION);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: 'Invalid token',
      });
    });

    it('when requisition body is without "homeTeam" property', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          homeTeam: undefined,
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: '"homeTeam" is required',
      });
    });

    it('when requisition body is without "homeTeamGoals" property', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          homeTeamGoals: undefined,
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: '"homeTeamGoals" is required',
      });
    });

    it('when requisition body is without "awayTeam" property', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          awayTeam: undefined,
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: '"awayTeam" is required',
      });
    });

    it('when requisition body is without "awayTeamGoals" property', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          awayTeamGoals: undefined,
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: '"awayTeamGoals" is required',
      });
    });

    it('when "homeTeam" property is invalid', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          homeTeam: 'invalid',
        });

      expect(response.status).to.equal(422);
      expect(response.body).to.deep.equal({
        message: '"homeTeam" must be a number',
      });
    });

    it('when "homeTeamGoals" property is invalid', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          homeTeamGoals: 'invalid',
        });

      expect(response.status).to.equal(422);
      expect(response.body).to.deep.equal({
        message: '"homeTeamGoals" must be a number',
      });
    });

    it('when "homeTeamGoals" property is less than 0', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          homeTeamGoals: -1,
        });

      expect(response.status).to.equal(422);
      expect(response.body).to.deep.equal({
        message: '"homeTeamGoals" must be greater than or equal to 0',
      });
    });

    it('when "awayTeam" property is invalid', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          awayTeam: 'invalid',
        });

      expect(response.status).to.equal(422);
      expect(response.body).to.deep.equal({
        message: '"awayTeam" must be a number',
      });
    });

    it('when "awayTeamGoals" property is invalid', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          awayTeamGoals: 'invalid',
        });

      expect(response.status).to.equal(422);
      expect(response.body).to.deep.equal({
        message: '"awayTeamGoals" must be a number',
      });
    });

    it('when "awayTeamGoals" property is less than 0', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          awayTeamGoals: -1,
        });

      expect(response.status).to.equal(422);
      expect(response.body).to.deep.equal({
        message: '"awayTeamGoals" must be greater than or equal to 0',
      });
    });

    it('when "inProgress" property is invalid', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          inProgress: 'invalid',
        });

      expect(response.status).to.equal(422);
      expect(response.body).to.deep.equal({
        message: '"inProgress" must be [true]',
      });
    });

    it('when "inProgress" property is false', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          inProgress: false,
        });

      expect(response.status).to.equal(422);
      expect(response.body).to.deep.equal({
        message: '"inProgress" must be [true]',
      });
    });

    it('when "homeTeam" does not exist', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          homeTeam: 999,
        });

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: 'There is no team with such id!',
      });
    });

    it('when "awayTeam" does not exist', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          awayTeam: 999,
        });

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: 'There is no team with such id!',
      });
    });

    it('when "homeTeam" is the same as "awayTeam"', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send({
          ...MATCH_CREATION,
          homeTeam: 1,
          awayTeam: 1,
        });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: 'It is not possible to create a match with two equal teams',
      });
    });

    it('when a unexpected error occurs', async () => {
      teamModelStub.resolves(NEW_MATCH as unknown as TeamModel);

      const response = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', MOCK_TOKEN)
        .send(MATCH_CREATION);

      expect(response.status).to.equal(500);
      expect(response.body).to.deep.equal({
        message: 'Internal server error',
      });
    });
  });
});
