import faker from 'faker'
import { IUserAvatar } from '../../models/shared-types'
import { getMongodbId } from '../../utils/helpers'
import { Producer } from './test-data-factory.types'

const userAvatarProducer: Producer<IUserAvatar> = () => {
  const id = getMongodbId()
  const email = faker.internet.email()
  const fullname = faker.name.findName()
  const avatarURL = faker.internet.url()
  return {
    id,
    email,
    fullname,
    avatarURL,
  }
}

export default userAvatarProducer
