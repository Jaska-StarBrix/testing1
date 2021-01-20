import { Document, ObjectId } from 'mongoose'
import { IUserAvatar, ICustomStatusMap } from './shared-types'
import { ProjectDocument } from './project'
import { UserDocument } from './user'
import { OrganisationDocument } from './organisation'

export interface ITeam {
  schemaVersion: number
  createdAt: Date
  name: string
  description: string
  owner: IUserAvatar
  projects: ObjectId[] | ProjectDocument[]
  members: ObjectId[] | UserDocument[]
  organisation: ObjectId | OrganisationDocument
  settings: {
    customProjectStatus?: {
      [k: string]: ICustomStatusMap
    }
    customTaskStatus?: {
      [k: string]: ICustomStatusMap
    }
  }
}

export type TeamDocument = ITeam & Document
