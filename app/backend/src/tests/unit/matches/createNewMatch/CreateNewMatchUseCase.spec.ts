import * as sinon from 'sinon';
import * as chai from 'chai';

import { MatchAttributes, MatchCreation } from '../../../../@types/types';

import MatchesRepository from '../../../../modules/matches/repository';
import CreateNewMatchUseCase from '../../../../modules/matches/useCases/createNewMatch/CreateNewMatchUseCase';

const { expect } = chai;

const matchesRepository = new MatchesRepository();
const createNewMatchUseCase = new CreateNewMatchUseCase(matchesRepository);

const NEW_MATCH_DATA: MatchCreation = {
  homeTeam: 1,
  awayTeam: 2,
  homeTeamGoals: 1,
  awayTeamGoals: 2,
  inProgress: true,
};

const NEW_MATCH: MatchAttributes = {
  id: 11,
  ...NEW_MATCH_DATA,
};

describe('Test CreateNewMatchUseCase', () => {
  let createStub: sinon.SinonStub;

  describe('1. Success case', () => {
    before(() => {
      createStub = sinon.stub(matchesRepository, 'create').resolves(NEW_MATCH);
    });

    after(() => {
      createStub.restore();
    });

    it('should return an object with status code and match data', async () => {
      const response = await createNewMatchUseCase.execute(NEW_MATCH_DATA);

      expect(response).to.be.an('object');
      expect(response).to.have.property('statusCode');
      expect(response).to.have.property('data');

      expect(response.statusCode).to.be.equal(201);
      expect(response.data).to.be.deep.equal(NEW_MATCH);
    });
  });
});
