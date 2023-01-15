import request from 'supertest';
import { server } from './src/main';


describe('Test users crud api', () => {
  const testUser = {
    username:'Test',
    age:'12',
    hobbies:['ride a bike']
  }
  let createdUserId = ''
  it('should return an empty array', async () => {
    const response = await request(server).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect([]);
  });
  it('should create new record and return this record', async () => {
    const response = await request(server).post('/api/users').send(testUser);
    expect(response.statusCode).toBe(201);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.body.id).toBeDefined();
    expect(response.body).toEqual({id:response.body.id,...testUser});
    createdUserId = response.body.id
  });
  it('should get the created record by its id',async ()=>{
    const response = await request(server).get(`/api/users/${createdUserId}`)
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.body).toEqual({id:createdUserId,...testUser});
  })
  it('should get the updated user record',async ()=>{
    const updatedRecord = {
      username:'John',
      age:'33',
      hobbies:[]
    }
    const response = await request(server).put(`/api/users/${createdUserId}`).send(updatedRecord)
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.body).toEqual({id:createdUserId,...updatedRecord});
  })
  it('should delete the created object by id',async ()=>{
    const response = await request(server).delete(`/api/users/${createdUserId}`)
    expect(response.statusCode).toBe(204);
  })
  it('trying to get a deleted object by id',async ()=>{
    const response = await request(server).get(`/api/users/${createdUserId}`)
    expect(response.statusCode).toBe(404);
  })
});
