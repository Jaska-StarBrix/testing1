import mongoose from 'mongoose'
import { customAlphabet } from 'nanoid'

export const getMongodbId = (): mongoose.Schema.Types.ObjectId =>
  (mongoose.Types.ObjectId() as unknown) as mongoose.Schema.Types.ObjectId

export const getRandomProjectNumber = (): string => {
  const getAlphabetOnlyId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 2)
  const getNumberOnlyId = customAlphabet('1234567890', 3)
  return `${getAlphabetOnlyId()}-${getNumberOnlyId()}`
}
