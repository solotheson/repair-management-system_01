import type { WorkspaceMember } from "../entities/workspace"

export interface AddWorkspaceMemberData {
  email: string
  password?: string
  firstName?: string
  lastName?: string
  telephoneNumber?: string
  role?: string
}

export interface IWorkspaceMemberRepository {
  list(workspaceId: string): Promise<WorkspaceMember[]>
  add(workspaceId: string, data: AddWorkspaceMemberData): Promise<WorkspaceMember>
  remove(workspaceId: string, memberId: string): Promise<void>
}
