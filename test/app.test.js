const request = require('supertest');
const app = require('../app');

describe('GET /users/search', () => {
  it('returns the matching user for a normal name', async () => {
    const res = await request(app).get('/users/search').query({ name: 'alice' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toMatchObject({ name: 'alice', email: 'alice@example.com' });
  });

  it('returns an empty list when no user matches', async () => {
    const res = await request(app).get('/users/search').query({ name: 'nobody' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('responds with JSON containing only the expected fields', async () => {
    const res = await request(app).get('/users/search').query({ name: 'bob' });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveLength(1);
    expect(Object.keys(res.body[0]).sort()).toEqual(['email', 'id', 'name']);
  });
});
