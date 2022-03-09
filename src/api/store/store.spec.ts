import supertest from 'supertest';
import UserModel from '../../models/user.model';
import { app } from '../../app';
import { STATUS_CODES, USER_ROLES } from '../../constants';
import { IUser } from '../../models/interfaces/user.interfaces';
import { IStore } from '../../models/interfaces/store.interfaces';
import { signJwt } from '../../helpers/auth.helpers';
import StoreModel from '../../models/store.model';

describe('Store /store', () => {
  const newAdminUser = {
    name: 'test admin',
    email: 'test@admin.com',
    password: 'password123',
    phoneNumber: '0788888888',
    roles: [USER_ROLES.ADMIN],
  };

  const newFarmerUser = {
    name: 'test farmer',
    email: 'test@farmer.com',
    password: 'password123',
    phoneNumber: '079999999',
  };

  const newStore = {
    storeName: 'Maize',
    quantity: 20,
    type: 'seed',
  };

  let adminUser: IUser;
  let farmerUser: IUser;
  let token = '';
  let store: IStore;

  beforeAll(async () => {
    adminUser = await UserModel.create(newAdminUser);
    farmerUser = await UserModel.create(newFarmerUser);
    store = await StoreModel.create(newStore);
    token = signJwt({ userId: adminUser._id }, { expiresIn: '15min' });
  });
  describe('POST /store', () => {
    it('should not create store if unauthorized', (done) => {
      supertest(app)
        .post('/api/v1/store')
        .send({})
        .end((err, res) => {
          expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
          done();
        });
    });

    it('should not create store if body not passing validation', (done) => {
      supertest(app)
        .post('/api/v1/store')
        .set('authorization', `Bearer ${token}`)
        .send({})
        .end((err, res) => {
          expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
          done();
        });
    });

    it('should not create store if user is not admin', (done) => {
      const tokenFarmer = signJwt(
        { userId: farmerUser._id },
        { expiresIn: '15min' }
      );
      supertest(app)
        .post('/api/v1/store')
        .set('authorization', `Bearer ${tokenFarmer}`)
        .send({})
        .end((err, res) => {
          expect(res.status).toBe(STATUS_CODES.FORBIDDEN);
          done();
        });
    });

    it('should create store', (done) => {
      const newStore2 = {
        storeName: 'Maize2',
        quantity: 20,
        type: 'seed',
      };
      supertest(app)
        .post('/api/v1/store')
        .set('authorization', `Bearer ${token}`)
        .send(newStore2)
        .end((err, res) => {
          expect(res.status).toBe(STATUS_CODES.CREATED);
          expect(res.body.storeName).toBe(newStore2.storeName);
          done();
        });
    });
  });

  describe('GET, UPDATE, DELETE /store', () => {
    it('should find store', (done) => {
      supertest(app)
        .get(`/api/v1/store/${store._id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).toBe(STATUS_CODES.OK);
          expect(res.body.storeName).toBe(store.storeName);
          done();
        });
    });

    it('should update store', (done) => {
      supertest(app)
        .patch(`/api/v1/store/${store._id}`)
        .set('authorization', `Bearer ${token}`)
        .send({ quantity: 500 })
        .end((err, res) => {
          expect(res.status).toBe(STATUS_CODES.OK);
          expect(res.body.quantity).toBe(500);
          done();
        });
    });

    it('should delete store', (done) => {
      supertest(app)
        .delete(`/api/v1/store/${store._id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).toBe(STATUS_CODES.NO_CONTENT);
          done();
        });
    });

    it('should not find store', (done) => {
      supertest(app)
        .get(`/api/v1/store/${store._id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).toBe(STATUS_CODES.NOT_FOUND);
          done();
        });
    });
  });
});
