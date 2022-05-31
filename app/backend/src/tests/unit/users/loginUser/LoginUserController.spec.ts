import { UnauthorizedError } from 'restify-errors';
import { NextFunction, request, response } from 'express';

import * as sinon from 'sinon';
import * as chai from 'chai';

import { SuccessReturn, UserLoginReturn } from '../../../../@types/types';

import UsersRepository from '../../../../modules/users/repository';
import LoginUserUseCase from '../../../../modules/users/useCases/loginUser/LoginUserUseCase';
import LoginUserController from '../../../../modules/users/useCases/loginUser/LoginUserController';

import AuthService from '../../../../services/Auth';
import EncryptService from '../../../../services/Encrypt';

import { users } from '../../../mock/users';

const { expect } = chai;

const usersRepository = new UsersRepository();
const loginUserUseCase = new LoginUserUseCase(
  usersRepository,
  AuthService,
  EncryptService
);
const loginUserController = new LoginUserController(loginUserUseCase);

const [admin, user] = users;

const SUCCESS_USE_CASE: SuccessReturn<UserLoginReturn> = {
  statusCode: 200,
  data: {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token: 'token',
  },
};

describe('Test LoginUserController', () => {
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
        .stub(loginUserUseCase, 'execute')
        .resolves(SUCCESS_USE_CASE);

      request.body = {
        email: user.email,
        password: user.password,
      };
    });

    after(() => {
      useCaseStub.restore();
      request.body = {};
    });

    it('should return an response with the user data, authorization token and status code', async () => {
      await loginUserController.handle(request, response, next.next);

      expect(spiedStatus.calledWith(200)).to.be.true;
      expect(spiedJson.calledWith(SUCCESS_USE_CASE.data)).to.be.true;
    });
  });

  describe('2. Fail case', () => {
    const UNAUTHORIZED_ERROR = new UnauthorizedError(
      'Incorrect email or password'
    );

    before(() => {
      useCaseStub = sinon
        .stub(loginUserUseCase, 'execute')
        .rejects(UNAUTHORIZED_ERROR);

      request.body = {
        email: admin.email,
        password: 'Trem',
      };
    });

    after(() => {
      useCaseStub.restore();
      request.body = {};
    });

    it('when the user does not exist, should call the next middleware passing the error', async () => {
      await loginUserController.handle(request, response, next.next);

      expect(spiedNext.calledWith(UNAUTHORIZED_ERROR)).to.be.true;
    });

    it('when the user exists but the password is incorrect, should call the next middleware passing the error', async () => {
      await loginUserController.handle(request, response, next.next);

      expect(spiedNext.calledWith(UNAUTHORIZED_ERROR)).to.be.true;
    });
  });
});
