/* eslint-disable no-console */
import chalk from 'chalk'
import mongoose, { ConnectionOptions } from 'mongoose'
import { MONGODB_URI, NODE_ENV } from './utils/constants'

const connectionOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}
export async function establishDbConnection(
  uri = MONGODB_URI,
  opts = connectionOptions
): Promise<unknown> {
  if (NODE_ENV === 'development') {
    console.log(chalk.blueBright('Connecting to database . . . '))
  }
  return (
    mongoose
      .connect(encodeURI(uri), opts)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((_mongoose) => {
        if (NODE_ENV === 'development') {
          console.log(chalk.blueBright('Database connection successful'))
        }
      })
      .catch((err) => {
        console.log(chalk.blueBright('Database connection failed'))
        console.log(chalk.redBright(err.message))
      })
  )
}

export async function closeDbConnection(): Promise<unknown> {
  console.log(chalk.blueBright('Closing database connection . . . '))
  return mongoose.connection.close()
}
