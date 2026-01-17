import type { IWorkspaceMemberRepository } from "../repositories/workspace-member-repository"

export class RemoveWorkspaceMemberUseCase {
  constructor(private repository: IWorkspaceMemberRepository) {}

  async execute(workspaceId: string, memberId: string): Promise<void> {
    return this.repository.remove(workspaceId, memberId)
  }
}

