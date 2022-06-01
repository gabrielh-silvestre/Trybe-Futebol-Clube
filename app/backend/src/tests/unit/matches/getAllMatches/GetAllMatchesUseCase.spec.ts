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
      findAllStub = sinon.stub(matchesRepository, 'findAll');

      findAllStub.onCall(0).resolves(matches);
      findAllStub.onCall(1).resolves(matches);
      findAllStub.onCall(2).resolves([]);
    });

    after(() => {
      findAllStub.restore();
    });

    it('when does not pass a filter, should return an object with all the matches data and status code', async () => {
      const result = await getAllMatchesUseCase.execute(null);

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

    it('when filter by finished matches, should return an object with all the finished matches data and status code', async () => {
      const result = await getAllMatchesUseCase.execute(false);

      expect(result).to.be.an('object');
      expect(result).to.have.property('statusCode');
      expect(result).to.have.property('data');

      expect(result.data).to.be.an('array');
      expect(result.data).to.be.not.empty;

      expect(result.data[0].inProgress).to.be.false;
    });

    it('when filter by in progress matches, should return an object with all the in progress matches data and status code', async () => {
      const result = await getAllMatchesUseCase.execute(true);

      expect(result).to.be.an('object');
      expect(result).to.have.property('statusCode');
      expect(result).to.have.property('data');

      expect(result.data).to.be.an('array');
      expect(result.data).to.be.empty;
    });
  });
});
