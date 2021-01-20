import { IInvitation } from '../../models/invitation'
import { IOrganisation } from '../../models/organisation'
import { IProject } from '../../models/project'
import { IUserAvatar } from '../../models/shared-types'
import { ITask } from '../../models/task'
import { ITeam } from '../../models/team'
import { IUser } from '../../models/user'

export type Producer<T> = () => T

export type FactoryFunctionType<T> = (n?: number) => T | T[]

export type FactoryBuilder<T> = (fn: Producer<T>) => FactoryFunctionType<T>

export enum FactoryType {
  Invitation,
  Organisation,
  Project,
  Task,
  Team,
  User,
  UserAvatar,
}

export type ModelUnion =
  | IInvitation
  | IOrganisation
  | IProject
  | ITask
  | ITeam
  | IUser
  | IUserAvatar

export type TestDataFactory<T> = (
  t: FactoryType
) => FactoryFunctionType<T> | null
