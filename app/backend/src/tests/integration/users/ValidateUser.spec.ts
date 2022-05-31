import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../../app';

import { users } from '../../mock/users';
import AuthService from '../../../services/Auth';
import { UserToken } from '../../../@types/types';

chai.use(chaiHttp);
const { expect } = chai;

const [_, user] = users;

const MOCK_TOKEN: UserToken = {
  data: {
    id: user.id,
    username: user.username,
    role: user.role,
  },
};

describe.only('Test endpoint GET /login/validate', () => {
  let authServiceStub: sinon.SinonStub;

  describe('1. Success case', () => {
    it('should return 200 and user role', async () => {
      const response = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', AuthService.generate(MOCK_TOKEN.data));

      expect(response.status).to.equal(200);

      expect(response.body).to.be.an('string');
      expect(response.body).to.equal(MOCK_TOKEN.data.role);
    });
  });

  describe('2. Fail case', () => {
    it('when token is invalid', async () => {
      const response = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'invalid');

      expect(response.status).to.equal(401);

      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid token');
    });
  });
});
