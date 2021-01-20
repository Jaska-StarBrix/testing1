import { TerminusOptions } from '@godaddy/terminus'
import { Application } from 'express'

export interface ApiServerConfig {
  app?: Application
  httpPort?: number | null
  terminusOptions: TerminusOptions
}
