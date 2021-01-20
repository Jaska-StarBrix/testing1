/* eslint-disable no-console */
import chalk from 'chalk'
import express, { Application } from 'express'
import http, { Server } from 'http'
import { createTerminus, HealthCheck, TerminusOptions } from '@godaddy/terminus'
import { ApiServerConfig } from './api-server.type'
import { NODE_ENV } from './utils/constants'
import app from './app'

export const healthCheck: HealthCheck = () => {
  return Promise.resolve({
    listening: ApiServer.getServer().listening,
  })
}
// eslint-disable-next-line
export const onSignal: () => Promise<any> = () => {
  if (NODE_ENV === 'development') {
    console.log(chalk.blueBright('Server is starting cleanup . . .'))
  }
  return Promise.all([
    // Clean up logics like closing mongodb connections goes here
  ])
}

export const onShutdown: () => Promise<number> = () => {
  if (NODE_ENV === 'development') {
    console.log(
      chalk.blueBright('Cleanup is finished, server is shutting down . . .')
    )
  }

  return Promise.resolve(1) /** Returning promise just to make ts happy */
}

const terminusOptions: TerminusOptions = {
  healthChecks: {
    '/healthcheck': healthCheck,
    verbatim: true,
  },
  onSignal,
  onShutdown,
  signal: 'SIGINT',
}

class ApiServer {
  private static _app: Application
  private static _server: Server
  private httpPort: string | number | null

  constructor({
    app = express(),
    httpPort = null,
    terminusOptions = {},
  }: ApiServerConfig) {
    ApiServer._app = app
    this.httpPort = httpPort
    if (!ApiServer._server) {
      /** createTerminus adds graceful shutdown and healthcheck to the server */
      ApiServer._server = createTerminus(
        http.createServer(ApiServer._app),
        terminusOptions
      )
    }
  }

  start(): Promise<Server | Error> {
    this.httpPort = this.httpPort
      ? this.httpPort
      : process.env.HTTP_PORT
      ? process.env.HTTP_PORT
      : 8080

    if (ApiServer._server.listening) {
      return Promise.resolve(ApiServer._server)
    }

    return new Promise((resolve, reject) => {
      try {
        ApiServer._server.listen(this.httpPort, () => {
          if (NODE_ENV === 'development') {
            console.log(
              chalk.blueBright('Api Server started at port', this.httpPort)
            )
          }
          return resolve(ApiServer._server)
        })
      } catch (err) {
        reject(err.message)
      }
    })
  }
  /** Shutdown running server */
  async shutdown() {
    const server = this.server
    if (!this.server.listening) {
      return Promise.resolve('Server is not listening')
    }
    return new Promise((resolve, reject) => {
      return server.close((err) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve('success')
        }
      })
    })
  }
  /** expose express app for both instances and class */
  get app() {
    return ApiServer._app
  }
  static getApp() {
    return ApiServer._app
  }

  /** expose http server */
  get server() {
    return ApiServer._server
  }

  static getServer() {
    return ApiServer._server
  }
}

export default new ApiServer({
  app,
  terminusOptions,
})
