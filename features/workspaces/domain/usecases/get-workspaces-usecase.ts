import type { IWorkspaceRepository } from "../repositories/workspace-repository"
import type { Workspace } from "../entities/workspace"

export class GetWorkspacesUseCase {
  constructor(private repository: IWorkspaceRepository) {}

  async execute(): Promise<Workspace[]> {
    return this.repository.getAll()
  }
}

