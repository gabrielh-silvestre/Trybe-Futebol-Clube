import * as sinon from 'sinon';
import * as chai from 'chai';

import { boardBuilder } from '../../../../utils/BoardBuilder';
import LeaderBoardRepository from '../../../../modules/leaderboard/repository';
import GetAwayBoardUseCase from '../../../../modules/leaderboard/useCases/getAwayBoard/GetAwayBoardUseCase';

import { board } from '../../../mock/leaderboards';

const { expect } = chai;

const leaderBoardRepository = new LeaderBoardRepository(boardBuilder);
const getHomeBoardUseCase = new GetAwayBoardUseCase(leaderBoardRepository);

describe('Test GetAwayBoardUseCase', () => {
  let findAllStub: sinon.SinonStub;

  describe('1. Success case', () => {
    before(() => {
      findAllStub = sinon.stub(leaderBoardRepository, 'getAll').resolves(board);
    });

    after(() => {
      findAllStub.restore();
    });

    it('when does not pass a filter, should return an object with leaderboard data and status code', async () => {
      const result = await getHomeBoardUseCase.execute();

      expect(result).to.be.an('object');
      expect(result).to.have.property('statusCode');
      expect(result).to.have.property('data');

      expect(result.data).to.be.an('array');

      expect(result.data[0]).to.be.an('object');
      expect(result.data[0]).to.have.property('name');
      expect(result.data[0]).to.have.property('totalPoints');
      expect(result.data[0]).to.have.property('totalGames');
      expect(result.data[0]).to.have.property('totalVictories');
      expect(result.data[0]).to.have.property('totalDraws');
      expect(result.data[0]).to.have.property('totalLosses');
      expect(result.data[0]).to.have.property('goalsFavor');
      expect(result.data[0]).to.have.property('goalsOwn');
      expect(result.data[0]).to.have.property('goalsBalance');
      expect(result.data[0]).to.have.property('efficiency');
    });
  });
});
