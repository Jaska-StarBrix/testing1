import supertest from 'supertest'
import apiServer from '../../api-server'

const { server } = apiServer

const api = supertest(server)

describe('health check', function () {
  it('should check the health of api', async function () {
    const res = await api.get('/healthcheck').expect(200)
    expect(res.body).toEqual({ status: 'ok', listening: true })
  })
})
