const request = require('supertest');
const imageRouter = require('./imageRoutes');
const app = require('express')();
const setupDB = require('../../setupDb');

app.use('/', imageRouter);

beforeAll(() => {
  setupDB();
});

describe('Image POST', () => {
  it('returns 201 on success', async () => {
    const res = await request(app)
      .post('/')
      .attach('image', `${__dirname}/../../../testImages/redSquare.png`)
      .field('tags', 'red square')
    
    expect(res.statusCode).toEqual(201);
  })
})