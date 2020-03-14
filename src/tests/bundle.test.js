import express from 'express'
const request = require('supertest')
const app = express()

beforeAll(async () => {
  //initialize test in memory server
  await require('../loaders/testLoader').default({ expressApp: app })
})
afterAll(async () => {
  console.log('FIMMMM')
})
const sample = {
  bundle_id: 'com.test.validation',
  invalid_bundle_id: 'com.test.vali-dation',
  other_bundle_id: 'com.test.other_validation',
  bump_bundle_id: 'com.test.bump_validation',
  not_recorded_bundle_id: 'com.test.not_recorded'
}
describe('Status endpoint', () => {
  it('check API status', async done => {
    const response = await request(app).get('/status')
    expect(response.status).toBe(200)
    done()
  })
})

describe('/set endpoint', () => {
  describe("If bundle id doesn't exists", () => {
    it('Should create new Bundle ID with build number = 0', async done => {
      const response = await request(app).post('/api/set?bundle_id=' + sample.bundle_id)
      expect(response.status).toBe(200)
      expect(response.body.bundleId).toEqual(sample.bundle_id)
      expect(response.body.buildNumber).toEqual(0)
      done()
    })
    it('Should create new Bundle ID with new build number', async done => {
      const response = await request(app).post(
        '/api/set?bundle_id=' + sample.other_bundle_id + '&new_build_number=15'
      )
      expect(response.status).toBe(200)
      expect(response.body.bundleId).toEqual(sample.other_bundle_id)
      expect(response.body.buildNumber).toEqual(15)
      done()
    })
  })
  it('Should not update a smaller build number for an existing bundle ID', async done => {
    const response = await request(app).post(
      '/api/set?bundle_id=' + sample.other_bundle_id + '&new_build_number=5'
    )
    expect(response.status).toBe(200)
    expect(response.body.bundleId).toEqual(sample.other_bundle_id)
    expect(response.body.buildNumber).toEqual(15)
    done()
  })
  it('Should update a build number for an existing bundle ID', async done => {
    const response = await request(app).post(
      '/api/set?bundle_id=' + sample.other_bundle_id + '&new_build_number=20'
    )
    expect(response.status).toBe(200)
    expect(response.body.bundleId).toEqual(sample.other_bundle_id)
    expect(response.body.buildNumber).toEqual(20)
    done()
  })
})


describe('/bump endpoint', () => {
  describe("If bundle id doesn't exists", () => {
    it('Should create new Bundle ID with build number = 0', async done => {
      const response = await request(app).post('/api/bump?bundle_id=' + sample.bump_bundle_id)
      expect(response.status).toBe(201)
      expect(response.body.bundleId).toEqual(sample.bump_bundle_id)
      expect(response.body.buildNumber).toEqual(0)
      done()
    })
   
  })
  it('Should bump an existing bundle ID (i++)', async done => {
    const response = await request(app).post(
      '/api/bump?bundle_id=' + sample.bump_bundle_id
    )
    expect(response.status).toBe(201)
    expect(response.body.bundleId).toEqual(sample.bump_bundle_id)
    expect(response.body.buildNumber).toEqual(1)
    done()
  })
})

describe('/read endpoint', () => {
  it('Should return data when look for bundle existing Bundle ID', async done => {
    const response = await request(app).get('/api/read?bundle_id=' + sample.bundle_id)
    expect(response.status).toBe(200)
    expect(response.body.bundleId).toEqual(sample.bundle_id)
    done()
  })
  it('Should return No Content for not found bundle id', async done => {
    const response = await request(app).get('/api/read?bundle_id=' + sample.not_recorded_bundle_id )
    expect(response.status).toBe(204)
    done()
  })
  it('Should deny invalid input', async done => {
    const response = await request(app).get('/api/read?bundle_id=' + sample.invalid_bundle_id )
    expect(response.status).toBe(500)
    expect(response.error.text).toContain('pattern')
    done()
  })
})

