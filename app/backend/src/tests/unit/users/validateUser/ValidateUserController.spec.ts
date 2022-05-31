import { UnauthorizedError } from 'restify-errors';
import { NextFunction, request, response } from 'express';

import * as sinon from 'sinon';
import * as chai from 'chai';

import { SuccessReturn } from '../../../../@types/types';

import ValidateUserUseCase from '../../../../modules/users/useCases/validateUser/ValidateUserUseCase';
import ValidateUserController from '../../../../modules/users/useCases/validateUser/ValidateUserController';

import AuthService from '../../../../services/Auth';

import { users } from '../../../mock/users';

const { expect } = chai;

const validateUserUseCase = new ValidateUserUseCase(AuthService);
const loginUserController = new ValidateUserController(validateUserUseCase);

const [user] = users;

const SUCCESS_USE_CASE: SuccessReturn<string> = {
  statusCode: 200,
  data: user.role,
};

describe('Test ValidateUserController', () => {
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
        .stub(validateUserUseCase, 'execute')
        .returns(SUCCESS_USE_CASE);

      request.headers = {
        authorization: 'valid_token',
      };
    });

    after(() => {
      useCaseStub.restore();
      request.headers = {};
    });

    it('should return a response with the user role and status code 200', () => {
      loginUserController.handle(request, response, next.next);

      expect(spiedStatus.calledWith(200)).to.be.true;
      expect(spiedJson.calledWith(SUCCESS_USE_CASE.data)).to.be.true;
    });
  });

  describe('2. Fail case', () => {
    const UNAUTHORIZED_ERROR = new UnauthorizedError('Invalid token');

    before(() => {
      useCaseStub = sinon
        .stub(validateUserUseCase, 'execute')
        .throws(UNAUTHORIZED_ERROR);

      request.headers = {
        authorization: 'invalid_token',
      };
    });

    after(() => {
      useCaseStub.restore();
      request.headers = {};
    });

    it('when token is invalid should call the next middleware passing the error', () => {
      loginUserController.handle(request, response, next.next);

      expect(spiedNext.calledWith(UNAUTHORIZED_ERROR)).to.be.true;
    });
  });
});
