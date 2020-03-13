
import express from 'express'
const app = express()
require('../loaders').default({ expressApp: app })
const supertest = require('supertest')
const request = supertest(app)

describe('mongo', () => {
  
  it('Gets the status endpoint', async done => {
    const response = await request.get('/status')
    expect(response.status).toBe(200)
    done()
  })

  it('set a new swlksadf', async done => {
    const newAppName = 'com.test.testingAPP'
    const response = await request.post(`/api/set?bundle_id=${newAppName}&new_build_number=17`)
    
    expect(response.status).toBe(200)
    expect(response.body)
});
})
