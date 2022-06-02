import * as sinon from 'sinon';
import * as chai from 'chai';

import type { MatchAttributes } from '../../../../@types/types';

import MatchesRepository from '../../../../modules/matches/repository';
import EditMatchScoreUseCase from '../../../../modules/matches/useCases/editMatchScore/EditMatchScoreUseCase';

import { matches } from '../../../mock/matches';

const { expect } = chai;

const matchesRepository = new MatchesRepository();
const editMatchScoreUseCase = new EditMatchScoreUseCase(matchesRepository);

const MATCH_UPDATE: Pick<MatchAttributes, 'homeTeamGoals' | 'awayTeamGoals'> = {
  homeTeamGoals: 2,
  awayTeamGoals: 3,
};

const UPDATED_MATCH: MatchAttributes = {
  ...matches[0],
  ...MATCH_UPDATE,
};

describe('Test EditMatchScoreUseCase', () => {
  let updateStub: sinon.SinonStub;

  describe('1. Success case', () => {
    before(() => {
      updateStub = sinon
        .stub(matchesRepository, 'update')
        .resolves(UPDATED_MATCH);
    });

    after(() => {
      updateStub.restore();
    });

    it('should return an object with status code and match data', async () => {
      const response = await editMatchScoreUseCase.execute(
        matches[0].id,
        MATCH_UPDATE
      );

      expect(response).to.be.an('object');
      expect(response).to.have.property('statusCode');
      expect(response).to.have.property('data');

      expect(response.statusCode).to.be.equal(200);
      expect(response.data).to.be.deep.equal(UPDATED_MATCH);
    });
  });
});
