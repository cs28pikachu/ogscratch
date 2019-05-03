const request = require('supertest');
const fs = require('fs');
const path = require('path');

const constants = require('../server/DB_TEST_CONSTANTS/constants')

// const testJsonFile = path.resolve(__dirname, '../server/db/markets.test.json');



const server = 'http://localhost:3000';

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200));


    });

    describe('GET ALL ART', () => {

      it('Returns art from the DB in an array', () => request(server)
        .get('/api/getallart')
        .expect((res) => {
          const stringBody = JSON.stringify(res.body);
          
          expect(Array.isArray(res.body)).toEqual(true);

          expect(stringBody).toContain(constants.arts[0].image);
          expect(stringBody).toContain(constants.arts[1].image);
          expect(stringBody).toContain(constants.arts[2].image);
          expect(stringBody).toContain(constants.arts[constants.arts.length -1 ].image);
        }));
    })

  });
});
