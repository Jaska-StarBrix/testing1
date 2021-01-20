import { Document, ObjectId } from 'mongoose'
import { InvitationStatus } from './shared-types'

export interface IInvitation {
  status: InvitationStatus
  invitor: {
    id: ObjectId
    orgName: string
  }
  invitee: string
}

export type InvitationDocument = IInvitation & Document
