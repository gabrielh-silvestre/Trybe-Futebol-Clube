import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import TeamsRepository from '../../../modules/teams/repository';

import { app } from '../../../app';

import { teams } from '../../mock/teams';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test endpoint GET /teams', () => {
  let repositoryStub: sinon.SinonStub;

  describe('1. Success case', () => {
    before(() => {
      repositoryStub = sinon
        .stub(TeamsRepository.prototype, 'findAll')
        .resolves(teams);
    });

    after(() => {
      repositoryStub.restore();
    });

    it('should return 200 and teams data', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.equal(200);

      expect(response.body).to.be.an('array');

      expect(response.body[0]).to.be.an('object');
      expect(response.body[0]).to.have.property('id');
      expect(response.body[0]).to.have.property('teamName');
    });
  });

  describe('2. Fail case', () => {
    before(() => {
      repositoryStub = sinon
        .stub(TeamsRepository.prototype, 'findAll')
        .rejects(new Error('Test error'));
    });

    after(() => {
      repositoryStub.restore();
    });

    it('when a unexpected error occurs', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.equal(500);
      expect(response.body).to.deep.equal({
        message: 'Internal server error',
      });
    });
  });
});
