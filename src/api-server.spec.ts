import apiServer from './api-server'

describe('ApiServer', function () {
  const { server } = apiServer

  afterEach(async function () {
    await apiServer.shutdown()
  })

  it('should resolve to http server', async function () {
    const startResult = await apiServer.start()
    expect(startResult).toEqual(server)
  })

  it('should resolve to server is not listening', async function () {
    const shutdown = await apiServer.shutdown()
    expect(shutdown).toBe('Server is not listening')
  })

  it('should stop the server when listening', async function () {
    await apiServer.start()
    const stopResult = await apiServer.shutdown()
    expect(stopResult).toBe('success')
  })
})
