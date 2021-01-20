import mongoose, { Document, ObjectId, Schema } from 'mongoose'
import { getRandomProjectNumber } from '../utils/helpers'
import { TaskDocument } from './task'
import { userAvatarPath, UserDocument } from './user'
import {
  Priority,
  IUserAvatar,
  ICustomStatusMap,
  Status,
  StatusGeometricShape,
  Models,
} from './shared-types'

export interface IProject {
  schemaVersion?: number
  createdAt?: Date
  updatedAt?: Date
  createdBy: IUserAvatar
  projectNumber?: string
  title: string
  description?: string
  projectManager: IUserAvatar
  plannedStartDate?: Date
  plannedEndDate?: Date
  actualStartDate?: Date
  actualEndDate?: Date
  status?: Status | ICustomStatusMap
  priority?: Priority
  organisation?: {
    id: string
    name: string
  }
  team?: {
    id: string
    name: string
  }
  tasks?: ObjectId[] | TaskDocument[]
  participants?: ObjectId[] | UserDocument[]
  settings?: {
    customProjectStatus?: [ICustomStatusMap]
    customTaskStatus?: [ICustomStatusMap]
  }
}

export type ProjectDocument = IProject & Document

export const projectSchema = new Schema(
  {
    schemaVersion: {
      type: Number,
      default: 1,
    },
    createdBy: userAvatarPath,
    projectNumber: {
      type: String,
      default: getRandomProjectNumber(),
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    projectManager: userAvatarPath,
    plannedStartDate: Date,
    plannedEndDate: Date,
    actualStartDate: Date,
    actualEndDate: Date,
    status: {
      type: String,
      default: Status.NOT_STARTED,
    },
    priority: {
      type: String,
      enum: [Priority.LOW, Priority.MEDIUM, Priority.HIGH, Priority.URGENT],
      default: Priority.MEDIUM,
    },
    organisation: {
      id: mongoose.Schema.Types.ObjectId,
      name: String,
    },
    team: {
      id: mongoose.Schema.Types.ObjectId,
      name: String,
    },
    tasks: [mongoose.Schema.Types.ObjectId],
    participants: [mongoose.Schema.Types.ObjectId],
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

const Project = mongoose.model<ProjectDocument>(Models.PROJECT, projectSchema)

export default Project
