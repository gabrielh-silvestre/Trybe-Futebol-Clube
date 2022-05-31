import * as sinon from 'sinon';
import * as chai from 'chai';

import UsersRepository from '../../../../modules/users/repository';
import LoginUserUseCase from '../../../../modules/users/useCases/loginUser/LoginUserUseCase';
import { users } from '../../../mock/users';
import { DefinedHttpError } from 'restify-errors';

const { expect } = chai;

const usersRepository = new UsersRepository();
const loginUserUseCase = new LoginUserUseCase(usersRepository);

const [admin, user] = users;

describe('Test LoginUserUseCase', () => {

  let findByEmailStub: sinon.SinonStub;

  describe('1. Success case', () => {
    before(() => {
      findByEmailStub = sinon
        .stub(usersRepository, 'findByEmail')
        .resolves(user);
    });

    after(() => {
      findByEmailStub.restore();
    });

    it('should return an object with the user data, authorization token and status code', async () => {
      const { email, password } = user;

      const result = await loginUserUseCase.execute({
        email,
        password,
      });

      expect(result).to.be.an('object');
      expect(result).to.have.property('statusCode');
      expect(result).to.have.property('data');

      expect(result.data).to.have.property('user');
      expect(result.data).to.have.property('token');

      expect(result.data.user).to.be.an('object');
      expect(result.data.user).to.have.property('id');
      expect(result.data.user).to.have.property('username');
      expect(result.data.user).to.have.property('email');
      expect(result.data.user).to.have.property('role');
      expect(result.data.user).to.not.have.property('password');
    });
  });

  describe('2. Fail case', () => {
    before(() => {
      findByEmailStub = sinon.stub(usersRepository, 'findByEmail');

      findByEmailStub.onCall(0).resolves(null);
      findByEmailStub.onCall(1).resolves(user);
    });

    after(() => {
      findByEmailStub.restore();
    });

    it('when the user does not exist, should throw an error with message and status code', async () => {
      const { password } = admin;

      try {
        await loginUserUseCase.execute({
          email: 'trem@trem.com',
          password,
        });
      } catch (error) {
        const typedError = error as DefinedHttpError;

        expect(typedError).to.be.an('object');
        expect(typedError).to.have.property('message');
        expect(typedError).to.have.property('statusCode');

        expect(typedError.statusCode).to.be.equal(401);
        expect(typedError.message).to.be.equal('Incorrect email or password');
      }
    });

    it('when the user credentials are invalid, should throw an error with message and status code', async () => {
      const { email } = admin;

      try {
        await loginUserUseCase.execute({
          email,
          password: 'wrongPassword',
        });
        expect.fail();
      } catch (error) {
        const typedError = error as DefinedHttpError;

        expect(typedError).to.be.an('object');
        expect(typedError).to.have.property('statusCode');
        expect(typedError).to.have.property('message');

        expect(typedError.statusCode).to.be.equal(401);
        expect(typedError.message).to.be.equal('Incorrect email or password');
      }
    });
  });
});
