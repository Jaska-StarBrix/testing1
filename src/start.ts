import dotenv from 'dotenv'
dotenv.config()

import apiServer from './api-server'
import { establishDbConnection } from './mongodb-manager'

async function start() {
  try {
    await establishDbConnection()
    await apiServer.start()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error starting app')
  }
}

/** Starts the app */
start()
