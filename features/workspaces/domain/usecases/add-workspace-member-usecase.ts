import type {
  IWorkspaceMemberRepository,
  AddWorkspaceMemberData,
} from "../repositories/workspace-member-repository"
import type { WorkspaceMember } from "../entities/workspace"
import { ValidationError } from "@/core/errors/domain-error"

export class AddWorkspaceMemberUseCase {
  constructor(private repository: IWorkspaceMemberRepository) {}

  async execute(workspaceId: string, data: AddWorkspaceMemberData): Promise<WorkspaceMember> {
    if (!data.userId) {
      throw new ValidationError("User is required")
    }

    if (!data.role) {
      throw new ValidationError("Role is required")
    }

    return this.repository.add(workspaceId, data)
  }
}

