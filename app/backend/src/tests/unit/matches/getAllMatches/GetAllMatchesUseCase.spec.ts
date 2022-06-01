import * as sinon from 'sinon';
import * as chai from 'chai';

import MatchesRepository from '../../../../modules/matches/repository';
import GetAllMatchesUseCase from '../../../../modules/matches/useCases/getAllMatches/GetAllMatchesUseCase';

import { matches } from '../../../mock/matches';

const { expect } = chai;

const matchesRepository = new MatchesRepository();
const getAllMatchesUseCase = new GetAllMatchesUseCase(matchesRepository);

describe('Test GetAllMatchesUseCase', () => {
  let findAllStub: sinon.SinonStub;

  describe('1. Success case', () => {
    before(() => {
      findAllStub = sinon.stub(matchesRepository, 'findAll').resolves(matches);
    });

    after(() => {
      findAllStub.restore();
    });

    it('should return an object with the matches data and status code', async () => {
      const result = await getAllMatchesUseCase.execute();

      expect(result).to.be.an('object');
      expect(result).to.have.property('statusCode');
      expect(result).to.have.property('data');

      expect(result.data).to.be.an('array');

      expect(result.data[0]).to.have.property('id');
      expect(result.data[0]).to.have.property('homeTeam');
      expect(result.data[0]).to.have.property('homeTeamGoals');
      expect(result.data[0]).to.have.property('awayTeam');
      expect(result.data[0]).to.have.property('awayTeamGoals');
      expect(result.data[0]).to.have.property('inProgress');
      expect(result.data[0]).to.have.property('teamHome');
      expect(result.data[0]).to.have.property('teamAway');
    });
  });
});
