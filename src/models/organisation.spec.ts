import faker from 'faker'
import mongoose from 'mongoose'
import Organisation, { IOrganisation } from './organisation'
import { establishDbConnection } from '../mongodb-manager'
import { getMongodbId } from '../utils/helpers'

describe('Organisation schema', function () {
  beforeAll(async function () {
    try {
      await establishDbConnection()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  })
  afterAll(async function () {
    await Organisation.deleteMany()
    await mongoose.connection.close()
  })

  it('should insert the defaults', async function () {
    const organisationObject = {
      name: faker.company.companyName(),
      email: faker.internet.email(),
      owner: {
        id: getMongodbId(),
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        avatarURL: faker.internet.url(),
      },
    } as IOrganisation
    const organisation = await Organisation.create(organisationObject)
    expect(organisation.schemaVersion).toBe(1)
    expect(organisation.createdAt).toBeTruthy()
    expect(organisation.updatedAt).toBeTruthy()
  })

  it('should auto format name and email', async function () {
    const organisationObject = {
      name: ' sTarBrix iNc   ',
      email: '   stArBrixiNtl@maiL.com  ',
      owner: {
        id: getMongodbId(),
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        avatarURL: faker.internet.url(),
      },
    } as IOrganisation

    const { name, email } = await Organisation.create(organisationObject)
    expect(name).toBe('Starbrix Inc')
    expect(email).toBe('starbrixintl@mail.com')
  })
})
