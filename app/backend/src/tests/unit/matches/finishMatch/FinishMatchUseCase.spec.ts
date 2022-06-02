import * as sinon from 'sinon';
import * as chai from 'chai';

import type { MatchAttributes } from '../../../../@types/types';

import MatchesRepository from '../../../../modules/matches/repository';
import FinishMatchUseCase from '../../../../modules/matches/useCases/finishMatch/FinishMatchUseCase';

import { matches } from '../../../mock/matches';
const { expect } = chai;

const matchesRepository = new MatchesRepository();
const finishMatchUseCase = new FinishMatchUseCase(matchesRepository);

const UPDATED_MATCH: MatchAttributes = matches[0];

describe('Test FinishMatchUseCase', () => {
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

    it('should return an object with status code and confirmation message', async () => {
      const response = await finishMatchUseCase.execute(1);

      expect(response).to.be.an('object');
      expect(response).to.have.property('statusCode');
      expect(response).to.have.property('data');

      expect(response.statusCode).to.be.equal(200);
      expect(response.data).to.be.deep.equal({
        message: 'Finished',
      });
    });
  });
});
