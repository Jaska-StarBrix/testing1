import faker from 'faker'
import { IOrganisation } from '../../models/organisation'
import { getMongodbId } from '../../utils/helpers'
import { Producer } from './test-data-factory.types'

const organisationProducer: Producer<IOrganisation> = () => {
  const name = faker.company.companyName()
  const email = faker.internet.email()
  const ownerFullname = faker.name.findName()
  const ownerEmail = faker.internet.email()
  const avatarURL = faker.internet.url()
  return {
    name,
    email,
    owner: {
      id: getMongodbId(),
      fullname: ownerFullname,
      email: ownerEmail,
      avatarURL,
    },
  }
}

export default organisationProducer
