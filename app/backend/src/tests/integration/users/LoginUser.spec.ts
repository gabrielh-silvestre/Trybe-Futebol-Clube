import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import UsersRepository from '../../../modules/users/repository';

import EncryptService from '../../../services/Encrypt';
import { app } from '../../../app';

import { users } from '../../mock/users';

chai.use(chaiHttp);
const { expect } = chai;

const [_, user] = users;

describe('Test endpoint POST /login', () => {
  let repositoryStub: sinon.SinonStub;
  let encryptServiceStub: sinon.SinonStub;

  describe('1. Success case', () => {
    before(() => {
      repositoryStub = sinon
        .stub(UsersRepository.prototype, 'findByEmail')
        .resolves(user);
      encryptServiceStub = sinon.stub(EncryptService, 'verify').resolves(true);
    });

    after(() => {
      repositoryStub.restore();
      encryptServiceStub.restore();
    });

    it('should return 200 and user data', async () => {
      const response = await chai.request(app).post('/login').send({
        email: user.email,
        password: user.password,
      });

      expect(response.status).to.equal(200);

      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('token');

      expect(response.body.user).to.be.an('object');
      expect(response.body.user).to.have.property('id');
      expect(response.body.user).to.have.property('username');
      expect(response.body.user).to.have.property('email');
      expect(response.body.user).to.have.property('role');

      expect(response.body.token).to.be.a('string');
    });
  });

  describe('2. Fail case', () => {
    before(() => {
      repositoryStub = sinon.stub(UsersRepository.prototype, 'findByEmail');

      repositoryStub.onCall(0).resolves(null);
      repositoryStub.onCall(1).resolves(user);

      encryptServiceStub = sinon.stub(EncryptService, 'verify').resolves(false);
    });

    after(() => {
      repositoryStub.restore();
      encryptServiceStub.restore();
    });

    it('when request body does not have email', async () => {
      const response = await chai.request(app).post('/login').send({
        password: user.password,
      });

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });

    it('when request body does not have password', async () => {
      const response = await chai.request(app).post('/login').send({
        email: user.email,
      });

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });

    it('when user does not exist', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'trem@trem.com',
        password: '123456',
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: 'Incorrect email or password',
      });
    });

    it('when password is incorrect', async () => {
      const response = await chai.request(app).post('/login').send({
        email: user.email,
        password: '1234567',
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: 'Incorrect email or password',
      });
    });
  });
});
