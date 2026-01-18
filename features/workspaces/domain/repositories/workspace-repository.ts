import type { Workspace } from "../entities/workspace"

export interface CreateWorkspaceData {
  name: string
  ownerEmail: string
  ownerPassword: string
}

export interface IWorkspaceRepository {
  getAll(): Promise<Workspace[]>
  create(data: CreateWorkspaceData): Promise<Workspace>
}
