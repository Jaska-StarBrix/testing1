import faker from 'faker'
import mongoose from 'mongoose'
import { establishDbConnection } from '../mongodb-manager'
import Project, { IProject } from './project'
import testDataFactory from '../factories/test-data-factory'
import {
  FactoryFunctionType,
  FactoryType,
} from '../factories/test-data-factory/test-data-factory.types'
import { IUserAvatar, Priority, Status } from './shared-types'

const userAvatarFactory = testDataFactory(
  FactoryType.UserAvatar
) as FactoryFunctionType<IUserAvatar>

describe('Project schema', function () {
  beforeAll(async function () {
    try {
      await establishDbConnection()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  })
  afterAll(async function () {
    // await Project.deleteMany()
    await mongoose.connection.close()
  })

  it('should insert the defaults', async function () {
    const projectObject = {
      createdBy: userAvatarFactory(),
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(9),
      projectManager: userAvatarFactory(),
    } as IProject

    const { schemaVersion, status, priority } = await Project.create(
      projectObject
    )
    expect(schemaVersion).toBe(1)
    expect(status).toBe(Status.NOT_STARTED)
    expect(priority).toBe(Priority.MEDIUM)
  })
})
