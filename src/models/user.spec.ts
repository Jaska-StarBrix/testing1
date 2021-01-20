import faker from 'faker'
import mongoose from 'mongoose'
import User, { IUser } from './user'
import { establishDbConnection } from '../mongodb-manager'

describe('User schema', function () {
  beforeAll(async function () {
    try {
      await establishDbConnection()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  })
  afterAll(async function () {
    await User.deleteMany()
    await mongoose.connection.close()
  })

  it('should insert the defaults', async function () {
    const userObject: IUser = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(8),
      avatarURL: faker.internet.url(),
    } as IUser
    const user = await User.create(userObject)
    expect(user.schemaVersion).toBe(1)
    expect(user.createdAt).toBeTruthy()
    expect(user.updatedAt).toBeTruthy()
    expect(user.accountStatus).toBe('WAITING_VERIFICATION')
  })

  it('should format names and email', async function () {
    const userObject: IUser = {
      firstname: 'jOhN',
      lastname: 'dOe',
      email: 'jOhNdOe@gmaIl.Com',
      password: 'askdfjdslkf',
      avatarURL: 'kjfdsajj',
    } as IUser
    const user = await User.create(userObject)
    expect(user.firstname).toBe('John')
    expect(user.lastname).toBe('Doe')
    expect(user.email).toBe('johndoe@gmail.com')
  })

  it('should throw when required properties are missing', async function () {
    const userObject = {
      password: 'lkjfadksjfdsjf',
      avatarURL: 'alkdjflsdajfkdj',
    }
    try {
      await User.create(userObject as IUser)
    } catch (err) {
      expect(err.errors.firstname.message).toMatch(/`firstname` is required/)
      expect(err.errors.email.message).toMatch(/`email` is required/)
      expect(err._message).toBe('User validation failed')
    }
  })

  it('should return fullname and initials', async function () {
    const userObject: IUser = {
      firstname: 'John',
      lastname: 'Doe',
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(8),
      avatarURL: faker.internet.url(),
    } as IUser
    const user = await User.create(userObject)
    expect(user.fullname).toBe('John Doe')
    expect(user.initials).toBe('JD')
  })

  it('should validate account status is not other than the enum values', async function () {
    const userObject: IUser = ({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(8),
      avatarURL: faker.internet.url(),
      accountStatus: 'dummystatus',
    } as unknown) as IUser // making ts happy
    try {
      await User.create(userObject)
    } catch (err) {
      const errorMessage = err.errors.accountStatus.message
      expect(errorMessage).toMatch(/`dummystatus` is not a valid enum value/)
    }
  })
  it('should validate email matches the email format', async function () {
    const userObject: IUser = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: 'invalid email',
      password: faker.random.alphaNumeric(8),
      avatarURL: faker.internet.url(),
    } as IUser
    try {
      await User.create(userObject)
    } catch (err) {
      expect(err.errors.email.message).toMatch(/`email` is invalid/)
    }
  })

  it('should return user avatar', async function () {
    const userObject: IUser = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(8),
      avatarURL: faker.internet.url(),
    } as IUser
    const user = await User.create(userObject)
    const { userAvatar } = user
    expect(userAvatar.id).toBe(user._id.toString())
    expect(userAvatar.avatarURL).toBe(user.avatarURL)
    expect(userAvatar.fullname).toBe(user.fullname)
    expect(userAvatar.email).toBe(user.email)
  })
})
