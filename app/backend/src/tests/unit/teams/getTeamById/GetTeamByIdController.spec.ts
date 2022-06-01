import { NextFunction, request, response } from 'express';

import * as sinon from 'sinon';
import * as chai from 'chai';

import type { SuccessReturn, TeamAttributes } from '../../../../@types/types';

import TeamsRepository from '../../../../modules/teams/repository';
import GetTeamByIdUseCase from '../../../../modules/teams/useCases/getTeamById/GetTeamByIdUseCase';
import GetAllTeamsController from '../../../../modules/teams/useCases/getTeamById/GetTeamByIdController';

import { teams } from '../../../mock/teams';
import { NotFoundError } from 'restify-errors';

const { expect } = chai;

const teamsRepository = new TeamsRepository();
const getTeamByIdUseCase = new GetTeamByIdUseCase(teamsRepository);
const getTeamByIdController = new GetAllTeamsController(getTeamByIdUseCase);

const SUCCESS_USE_CASE: SuccessReturn<TeamAttributes> = {
  statusCode: 200,
  data: teams[0],
};

describe('Test GetTeamByIdController', () => {
  let useCaseStub: sinon.SinonStub;
  let spiedStatus: sinon.SinonSpy;
  let spiedJson: sinon.SinonSpy;
  let spiedNext: sinon.SinonSpy;
  const next = {
    next: (_args: any) => {},
  } as { next: NextFunction };

  before(() => {
    spiedStatus = sinon.spy(response, 'status');
    spiedJson = sinon.spy(response, 'json');
    spiedNext = sinon.spy(next, 'next');
  });

  after(() => {
    spiedStatus.restore();
    spiedJson.restore();
    spiedNext.restore();
  });

  describe('1. Success case', () => {
    before(() => {
      useCaseStub = sinon
        .stub(getTeamByIdUseCase, 'execute')
        .resolves(SUCCESS_USE_CASE);

      request.params = {
        id: '1',
      };
    });

    after(() => {
      useCaseStub.restore();
      request.params = {};
    });

    it('should return an response with the team data and status code 200', async () => {
      await getTeamByIdController.handle(request, response, next.next);

      expect(spiedStatus.calledWith(200)).to.be.true;
      expect(spiedJson.calledWith(SUCCESS_USE_CASE.data)).to.be.true;
    });
  });

  describe('2. fail case', () => {
    const NOT_FOUND_ERROR = new NotFoundError('Team not found');

    before(() => {
      useCaseStub = sinon
        .stub(getTeamByIdUseCase, 'execute')
        .rejects(NOT_FOUND_ERROR);

      request.params = {
        id: '477',
      };
    });

    after(() => {
      useCaseStub.restore();
    });

    it('when the team does not exist, should call the next middleware passing the error', async () => {
      await getTeamByIdController.handle(request, response, next.next);

      expect(spiedNext.calledWith(NOT_FOUND_ERROR)).to.be.true;
    });
  });
});
