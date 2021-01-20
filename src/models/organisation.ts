import mongoose, { Document, ObjectId, Schema } from 'mongoose'
import { InvitationDocument } from './invitation'
import { ProjectDocument } from './project'
import {
  IUserAvatar,
  ICustomStatusMap,
  StatusGeometricShape,
  Models,
} from './shared-types'
import { userAvatarPath, UserDocument } from './user'
import { EMAIL_REGEX } from '../utils/constants'
import { capitalizeWords } from '../utils/utils'

export interface IOrganisation {
  schemaVersion?: number
  createdAt?: Date
  updatedAt?: Date
  name: string
  email: string
  owner: IUserAvatar
  projects?: ObjectId[] | ProjectDocument[]
  members?: ObjectId[] | UserDocument[]
  invitations?: ObjectId[] | InvitationDocument[]
  teams?: {
    id: ObjectId
    name: string
  }[]
  settings?: {
    customProjectStatus?: ICustomStatusMap[]
    customTaskStatus?: ICustomStatusMap[]
  }
}

export type OrganisationDocument = IOrganisation & Document

export const organisationSchema: Schema = new Schema(
  {
    schemaVersion: {
      type: Number,
      default: 1,
    },
    name: {
      type: String,
      required: true,
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
    owner: userAvatarPath,
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: Models.PROJECT }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: Models.USER }],
    invitations: [
      { type: mongoose.Schema.Types.ObjectId, ref: Models.INVITATION },
    ],
    teams: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: Models.TEAM },
        name: String,
      },
    ],
    settings: {
      customProjectStatus: [
        {
          label: {
            type: String,
            required: true,
          },
          hasStartDate: {
            type: Boolean,
            required: true,
          },
          hasEndDate: {
            type: Boolean,
            required: true,
          },
          shape: {
            type: String,
            enum: [
              StatusGeometricShape.CIRCLE,
              StatusGeometricShape.TRIANGLE,
              StatusGeometricShape.SQUARE,
              StatusGeometricShape.DIAMOND,
            ],
            required: true,
          },
          color: {
            type: String,
            required: true,
          },
        },
      ],
      customTaskStatus: [
        {
          label: {
            type: String,
            required: true,
          },
          hasStartDate: {
            type: Boolean,
            required: true,
          },
          hasEndDate: {
            type: Boolean,
            required: true,
          },
          shape: {
            type: String,
            enum: [
              StatusGeometricShape.CIRCLE,
              StatusGeometricShape.TRIANGLE,
              StatusGeometricShape.SQUARE,
              StatusGeometricShape.DIAMOND,
            ],
            required: true,
          },
          color: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
)

organisationSchema.pre('save', function (this: OrganisationDocument, next) {
  this.name = capitalizeWords(this.name)
  next()
})

const Organisation = mongoose.model<OrganisationDocument>(
  Models.ORGANISATION,
  organisationSchema
)

export default Organisation
