import { DefinedHttpError } from 'restify-errors';

import * as sinon from 'sinon';
import * as chai from 'chai';

import ValidateUserUseCase from '../../../../modules/users/useCases/validateUser/ValidateUserUseCase';

import AuthService from '../../../../services/Auth';

import { users } from '../../../mock/users';
import { UserToken } from '../../../../@types/types';

const { expect } = chai;

const validateUserUseCase = new ValidateUserUseCase(AuthService);

const [user] = users;

const MOCK_TOKEN: UserToken = {
  data: {
    id: user.id,
    username: user.username,
    role: user.role,
  },
};

describe('Test ValidateUserUseCase', () => {
  let authServiceStub: sinon.SinonStub;

  describe('1. Success case', () => {
    before(() => {
      authServiceStub = sinon.stub(AuthService, 'validate').returns(MOCK_TOKEN);
    });

    after(() => {
      authServiceStub.restore();
    });

    it('should return an object withe the user role and status cade', () => {
      const result = validateUserUseCase.execute('token');

      expect(result).to.be.an('object');
      expect(result).to.have.property('statusCode');
      expect(result).to.have.property('data');

      expect(result.data).to.an('string');
      expect(result.data).to.equal(user.role);
    });
  });

  describe('2. Fail case', () => {
    before(() => {
      authServiceStub = sinon.stub(AuthService, 'validate').returns(null);
    });

    after(() => {
      authServiceStub.restore();
    });

    it('when the token is invalid should throw an error with message and status code', () => {
      try {
        validateUserUseCase.execute('invalid_token');
        expect.fail();
      } catch (error) {
        const typedError = error as DefinedHttpError;

        expect(typedError).to.be.an('object');
        expect(typedError).to.have.property('message');
        expect(typedError).to.have.property('statusCode');

        expect(typedError.statusCode).to.equal(401);
        expect(typedError.message).to.equal('Invalid token');
      }
    });
  });
});
