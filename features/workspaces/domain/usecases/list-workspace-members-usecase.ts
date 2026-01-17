import type { IWorkspaceMemberRepository } from "../repositories/workspace-member-repository"
import type { WorkspaceMember } from "../entities/workspace"

export class ListWorkspaceMembersUseCase {
  constructor(private repository: IWorkspaceMemberRepository) {}

  async execute(workspaceId: string): Promise<WorkspaceMember[]> {
    return this.repository.list(workspaceId)
  }
}

