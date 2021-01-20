import mongoose, { Document, ObjectId, Schema } from 'mongoose'
import { OrganisationDocument } from './organisation'
import { ProjectDocument } from './project'
import { TeamDocument } from './team'
import {
  IComment,
  ICustomStatusMap,
  ITodo,
  IUserAvatar,
  Models,
  Priority,
  Status,
} from './shared-types'
import { userAvatarPath, UserDocument } from './user'

export interface ITask {
  schemaVersion?: number
  createdAt?: Date
  updatedAt?: Date
  createdBy: IUserAvatar
  title: string
  description?: string
  plannedStartDate?: Date
  plannedEndDate?: Date
  actualStartDate?: Date
  actualEndDate?: Date
  status?: Status
  priority?: Priority
  organisation?: ObjectId | OrganisationDocument
  team?: ObjectId | TeamDocument
  project?: ObjectId | ProjectDocument
  subtasks?: ObjectId[] | ITask[]
  asignees: UserDocument[]
  todos?: ITodo[]
  comments?: IComment[]
  settings?: {
    customTaskStatus?: {
      [k: string]: ICustomStatusMap
    }
  }
}
export type TaskDocument = ITask & Document

export const taskSchema = new Schema(
  {
    schemaVersion: {
      type: Number,
      default: 1,
    },
    createdBy: userAvatarPath,
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: Models.ORGANISATION,
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: Models.TEAM },
    project: { type: mongoose.Schema.Types.ObjectId, ref: Models.PROJECT },
    subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: Models.TASK }],
    asignees: [{ type: mongoose.Schema.Types.ObjectId, ref: Models.USER }],
  },
  {
    timestamps: true,
  }
)

const Task = mongoose.model<TaskDocument>(Models.TASK, taskSchema)

export default Task
