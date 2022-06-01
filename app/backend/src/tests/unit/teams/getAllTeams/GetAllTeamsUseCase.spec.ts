import * as sinon from 'sinon';
import * as chai from 'chai';

import TeamsRepository from '../../../../modules/teams/repository';
import GetAllTeamsUseCase from '../../../../modules/teams/useCases/getAllTeams/GetAllTeamsUseCase';

import { teams } from '../../../mock/teams';

const { expect } = chai;

const teamsRepository = new TeamsRepository();
const getAllTeamsUseCase = new GetAllTeamsUseCase(teamsRepository);

describe('Test GetAllTeamsUseCase', () => {
  let findAllStub: sinon.SinonStub;

  describe('1. Success case', () => {
    before(() => {
      findAllStub = sinon.stub(teamsRepository, 'findAll').resolves(teams);
    });

    after(() => {
      findAllStub.restore();
    });

    it('should return an object with the teams data and status code', async () => {
      const result = await getAllTeamsUseCase.execute();

      expect(result).to.be.an('object');
      expect(result).to.have.property('statusCode');
      expect(result).to.have.property('data');

      expect(result.data).to.be.an('array');

      expect(result.data[0]).to.have.property('id');
      expect(result.data[0]).to.have.property('teamName');
    });
  });
});
