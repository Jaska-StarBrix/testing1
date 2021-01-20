import {
  FactoryType,
  FactoryBuilder,
  ModelUnion,
  TestDataFactory,
} from './test-data-factory.types'

import organisationProducer from './organisationProducer'
import userAvatarProducer from './userProducer'

const factoryBuilder: FactoryBuilder<ModelUnion> = (producer) => {
  return function (n = 1) {
    if (n === 1) {
      return producer()
    } else {
      return (
        Array(n)
          .fill(null)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map((_) => producer())
      )
    }
  }
}
/**
 *
 * @param type enum value of factory type that needs to be returned
 * @returns a higher order factory function which when invoked
 * returns a plain old js object of factory type
 * @usage
 *
 *    const userFactory = testDataFactory(FactoryType.User)
 *    const users = userFactory(5) // returns js object of 5 users
 *
 */
const testDataFactory: TestDataFactory<ModelUnion> = (type: FactoryType) => {
  switch (type) {
    case FactoryType.Organisation:
      return factoryBuilder(organisationProducer)
    case FactoryType.UserAvatar:
      return factoryBuilder(userAvatarProducer)
    default:
      return null
  }
}

export default testDataFactory
