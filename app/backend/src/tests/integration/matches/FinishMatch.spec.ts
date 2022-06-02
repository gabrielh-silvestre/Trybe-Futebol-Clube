import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import type { MatchAttributes, UserTokenData } from '../../../@types/types';

import MatchModel from '../../../database/models/MatchModel';
import MatchesRepository from '../../../modules/matches/repository';
import AuthService from '../../../services/Auth';

import { app } from '../../../app';

import { users } from '../../mock/users';
import { matches } from '../../mock/matches';

chai.use(chaiHttp);
const { expect } = chai;

const [admin] = users;

const MATCH_UPDATED: MatchAttributes = matches[0];

const MOCK_TOKEN_DATA: UserTokenData = admin;

const MOCK_TOKEN = AuthService.generate(MOCK_TOKEN_DATA);

describe('Test endpoint PATCH /matches/:id/finish', () => {
  let matchesRepositoryStub: sinon.SinonStub;
  let matchModelStub: sinon.SinonStub;

  describe('1. Success case', () => {
    before(() => {
      matchesRepositoryStub = sinon
        .stub(MatchesRepository.prototype, 'update')
        .resolves(MATCH_UPDATED);

      matchModelStub = sinon
        .stub(MatchModel, 'findByPk')
        .resolves(MATCH_UPDATED as unknown as MatchModel);
    });

    after(() => {
      matchesRepositoryStub.restore();
      matchModelStub.restore();
    });

    it('should return 200 and finished message', async () => {
      const response = await chai
        .request(app)
        .patch(`/matches/${MATCH_UPDATED.id}/finish`)
        .set('Authorization', MOCK_TOKEN);

      expect(response.status).to.equal(200);

      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Finished');
    });
  });

  describe('2. Error case', () => {
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

    it('when match does not exist', async () => {
      const response = await chai
        .request(app)
        .patch(`/matches/${MATCH_UPDATED.id}/finish`)
        .set('Authorization', MOCK_TOKEN);

      expect(response.status).to.equal(404);

      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Match not found');
    });

    it('when a unexpected error occurs', async () => {
      matchModelStub.resolves(MATCH_UPDATED as unknown as MatchModel);

      const response = await chai
        .request(app)
        .patch(`/matches/${MATCH_UPDATED.id}/finish`)
        .set('Authorization', MOCK_TOKEN);

      expect(response.status).to.equal(500);

      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Error');
    });
  });
});
