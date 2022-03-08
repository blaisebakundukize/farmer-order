import supertest from 'supertest';
import UserModel from '../../models/user.model';
import { app } from '../../app';
import { STATUS_CODES } from '../../constants';

describe('Auth /auth', () => {
  describe('POST /register', () => {
    const newUser = {
      name: 'test',
      email: 'test@test.com',
      password: 'password123',
      phoneNumber: '0788888888',
    };

    it('should be able to register user', (done) => {
      supertest(app)
        .post('/api/v1/auth/register')
        .send(newUser)
        .end((err, res) => {
          expect(res.status).toBe(STATUS_CODES.CREATED);
          done();
        });
    });
  });
});
