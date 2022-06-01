import type { DefinedHttpError } from 'restify-errors';

import * as sinon from 'sinon';
import * as chai from 'chai';

import TeamsRepository from '../../../../modules/teams/repository';
import GetTeamByIdUseCase from '../../../../modules/teams/useCases/getTeamById/GetTeamByIdUseCase';

import { teams } from '../../../mock/teams';

const { expect } = chai;

const teamsRepository = new TeamsRepository();
const getTeamByIdUseCase = new GetTeamByIdUseCase(teamsRepository);

describe('Test GetTeamByIdUseCase', () => {
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

    it('should return an object with the teams data and status cade', async () => {
      const result = await getTeamByIdUseCase.execute(1);

      expect(result).to.be.an('object');
      expect(result).to.have.property('statusCode');
      expect(result).to.have.property('data');

      expect(result.data).to.be.an('object');

      expect(result.data).to.have.property('id');
      expect(result.data).to.have.property('teamName');
    });
  });

  describe('2. Fail case', () => {
    before(() => {
      repositoryStub = sinon
        .stub(TeamsRepository.prototype, 'findById')
        .resolves(null);
    });

    after(() => {
      repositoryStub.restore();
    });

    it('when the team does not exist, should throw an error with message and status code', async () => {
      try {
        const result = await getTeamByIdUseCase.execute(400);
        expect.fail();
      } catch (error) {
        const typedError = error as DefinedHttpError;

        expect(typedError).to.be.an('object');
        expect(typedError).to.have.property('message');
        expect(typedError).to.have.property('statusCode');

        expect(typedError.statusCode).to.be.equal(404);
        expect(typedError.message).to.be.equal('Team not found');
      }
    });
  });
});
