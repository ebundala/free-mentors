/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import chai from 'chai';
import chaiHttp from 'chai-http';
import { debug, table } from 'console';
import faker from 'faker';
import request from 'request';
import server from '../../server';
// eslint-disable-next-line import/named
import { PORT, adminToken } from '../../server/confing/config';

chai.use(chaiHttp);
// const baseUrl = `http://localhost:${PORT}`;
const requester = chai.request(server).keepOpen();
const { expect } = chai;

describe('Api endpoints tests', () => {
  let user;
  let userId;
  before(async () => {
    user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.random.words(2),
      bio: faker.lorem.sentences(3),
      address: faker.address.streetAddress(true),
      occupation: faker.name.jobTitle(),
      expertise: faker.name.jobType(),
      dob: faker.date.past(18),
      gender: faker.name.title(),
    };
  });
  after(async () => {
    user = null;
    await requester.close();
  });

  describe('Api docs are accessible', () => {
    it('GET /api/v1/api-docs', async () => {
      const response = await requester.get('/api/v1/api-docs');
      expect(response.statusCode).to.equal(200, 'http ok');
      expect(response.text).to.be.a('string');
    });
  });
  describe('user sign up', () => {
    let response;
    before(async () => {
      response = await requester.post('/api/v1/auth/signup')
        .send(user);
    });

    // response
    it('has valid status code 201', () => {
      expect(response.statusCode).equal(201);
    });
    it('has a valid data ', () => {
      const { status, message, data } = response.body;
      expect(status).is.eq(201);
      expect(message).is.eq('User created successfully');
      expect(data.id).greaterThan(0);
      expect(data.role).is.eql('mentee');
      expect(data.role).is.eql('mentee');
      expect(data.email).is.eql(user.email);
      expect(data.bio).is.eql(user.bio);
      expect(data.occupation).is.eql(user.occupation);
      expect(data.expertise).is.eql(user.expertise);
      expect(data).to.have.property('dob');
      expect(data).to.have.property('createdOn');
    });
  });

  describe('user sign in', () => {
    /* let credentials;
    let response;
    before(async () => {
      credentials = {
        email: user.email,
        password: user.password,
      };
      response = await requester.post('api/v1/auth/signin').send(credentials);
    }); */

    // response
    it('has valid status code 200');

    it('has a success messages ');
    /* , () => {
      const { status, message } = response.body;
      expect(status).to.be(200);
      expect(message).to.be('User is successfully logged in');
    } */
    /* , () => {
      const { data } = response.body;
      const { token } = data;
      expect(token).to.be.string();
    } */
    it('has a valid token ');
  });


  describe('change user to mentor', () => {
    let response;
    before(async () => {
    /*  response = await requester.patch(`api/v1/auth/user/${userId}`)
        .set('Authorization', `bearer ${adminToken}`).send(); */
    });
    it('has a valid token');
    it('has status code 200');
    it('it has a success message ');
  });


  describe('get all mentors', () => {
    before(() => {});
    describe('get all mentors request ', () => {
      it('has a password');
      it('has a email');
    });
    describe('get all mentors response ', () => {
      it('has status code 200');
      it('it has a list of mentors');
      it('each mentor has valid details');
    });
  });


  describe('get specific mentor details', () => {
    before(() => {});
    describe('get specific mentor request ', () => {
      it('has a password');
      it('has a email');
    });
    describe('get specific mentor response ', () => {
      it('has status code 200');
      it('has required field ');
    });
  });


  describe('create a mentorship request', () => {
    before(() => {});
    describe('mentorship request request ', () => {
      it('has a valid token ');
      it('has a valid mentorId');
      it('has a required questions');
    });
    describe('mentorship request response ', () => {
      it('has status code 200');
      it('has valid sessionId ');
      it('has valid mentorId');
      it('has valid menteeId');
      it('has valid status');
    });
  });


  describe('accept mentor request', () => {
    before(() => {});
    describe('accept mentor request request ', () => {
      it('has a valid token');
      it('has a required permissions');
      it('has a valid sessionId');
    });
    describe('accept mentor request response ', () => {
      it('has status code 200');
      it('has valid sessionId ');
      it('has valid mentorId');
      it('has valid menteeId');
      it('has valid status');
    });
  });


  describe('reject mentor request', () => {
    before(() => {});
    describe('reject mentor request request ', () => {
      it('has a valid token');
      it('has a required permissions');
      it('has a valid sessionId');
    });
    describe('reject mentor request response ', () => {
      it('has status code 200');
      it('has valid sessionId ');
      it('has valid mentorId');
      it('has valid menteeId');
      it('has valid status');
    });
  });

  describe('complete mentor request', () => {
    before(() => {});
    describe('complete mentor request request ', () => {
      it('has a valid token');
      it('has a required permissions');
      it('has a valid sessionId');
    });
    describe('complete mentor request response ', () => {
      it('has status code 200');
      it('has valid sessionId ');
      it('has valid mentorId');
      it('has valid menteeId');
      it('has valid status');
    });
  });

  describe('review mentor ', () => {
    before(() => {});
    describe('review mentor request ', () => {
      it('has a valid token');
      it('has a required permissions');
      it('has a valid sessionId');
      it('has a session which is complete');
      it('has a valid score');
      it('has a valid remark');
    });
    describe('review mentor response ', () => {
      it('has status code 200');
      it('has valid sessionId ');
      it('has valid mentorId');
      it('has valid menteeId');
      it('has a valid score');
      it('has a valid remark');
    });
  });


  describe('delete review ', () => {
    before(() => {});
    describe('delete review request ', () => {
      it('has a valid token');
      it('has a required permissions');
      it('has a valid sessionId');
    });
    describe('review mentor response ', () => {
      it('has status code 200');
      it('has valid sessionId ');
      it('has valid mentorId');
      it('has valid menteeId');
      it('has a valid score');
      it('has a valid remark');
    });
  });
});
