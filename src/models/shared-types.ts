import { ObjectId } from 'mongoose'

export enum AccountStatus {
  WAITING_VERIFICATION = 'Waiting Verification',
  ACTIVE = 'Active',
  DEACTIVATED = 'Deactivated',
}

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  URGENT = 'Urgent',
}

export enum StatusGeometricShape {
  CIRCLE = 'Circle',
  TRIANGLE = 'Triangle',
  SQUARE = 'Square',
  DIAMOND = 'Diamond',
}

export enum InvitationStatus {
  PENDING,
  REJECTED,
}

export enum Status {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  REJECTED = 'Rejected',
}

export interface IUserAvatar {
  id: string
  fullname: string
  email: string
  avatarURL: string
}

export interface ICustomStatusMap {
  label: string
  hasStartDate: boolean
  hasEndDate: boolean
  shape: StatusGeometricShape
  color: string
}

export interface ITodo {
  id: ObjectId
  text: string
  completed: boolean
}

export interface IComment {
  text: string
  commenter: string
  commentDate: Date
  commenterAvatarURL: string
  replies: IComment[]
}

export enum Models {
  INVITATION = 'Invitation',
  ORGANISATION = 'Organisation',
  PROJECT = 'Project',
  TASK = 'Task',
  TEAM = 'Team',
  USER = 'User',
}
