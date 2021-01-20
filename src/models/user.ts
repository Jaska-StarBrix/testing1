import mongoose, { Document, Schema, model, ObjectId } from 'mongoose'
import { EMAIL_REGEX } from '../utils/constants'
import { capitalize } from '../utils/utils'
import { InvitationDocument } from './invitation'
import { OrganisationDocument } from './organisation'
import { AccountStatus, IUserAvatar, Models } from './shared-types'

export interface IUser {
  schemaVersion?: number
  createdAt?: Date
  updatedAt?: Date
  firstname: string
  lastname?: string
  email: string
  password: string
  accountStatus?: AccountStatus
  avatarURL: string
  organisations?: ObjectId[] | OrganisationDocument[]
  invitations?: ObjectId[] | InvitationDocument[]
  /** computed properties */
  fullname: string
  initials: string
  userAvatar: IUserAvatar
  /** static methods */
}

export type UserDocument = IUser & Document

export const userAvatarPath = {
  id: { type: String, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  avatarURL: { type: String, required: true },
}

export const userSchema: Schema = new Schema(
  {
    schemaVersion: {
      type: Number,
      default: 1,
    },
    firstname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 128,
      trim: true,
    },
    lastname: {
      type: String,
      minlength: 2,
      maxlength: 128,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
      match: EMAIL_REGEX,
    },
    password: {
      type: String,
      required: true,
    },
    accountStatus: {
      type: String,
      enum: [
        AccountStatus.WAITING_VERIFICATION,
        AccountStatus.ACTIVE,
        AccountStatus.DEACTIVATED,
      ],
      default: AccountStatus.WAITING_VERIFICATION,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    organisations: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: Models.ORGANISATION,
    },
    invitations: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: Models.INVITATION,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.virtual('fullname').get(function (this: UserDocument): string {
  return `${this.firstname} ${this?.lastname}`.trim()
})

userSchema.virtual('initials').get(function (this: UserDocument): string {
  const firstInitial = this.firstname[0]
  const lastInitial = this?.lastname?.[0] ? this.lastname[0] : this.firstname[1]
  return `${firstInitial}${lastInitial}`.toUpperCase()
})

userSchema
  .virtual('userAvatar')
  .get(function (this: UserDocument): IUserAvatar {
    return {
      id: this._id.toString(),
      avatarURL: this.avatarURL,
      fullname: this.fullname as string,
      email: this.email,
    }
  })

userSchema.pre('save', function (this: UserDocument, next) {
  this.firstname = capitalize(this.firstname)
  this.lastname = this.lastname ? capitalize(this.lastname) : ''
  next()
})

const User = model<UserDocument>(Models.USER, userSchema)

export default User
