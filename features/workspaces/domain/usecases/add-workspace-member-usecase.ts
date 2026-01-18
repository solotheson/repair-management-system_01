import type {
  IWorkspaceMemberRepository,
  AddWorkspaceMemberData,
} from "../repositories/workspace-member-repository"
import type { WorkspaceMember } from "../entities/workspace"
import { ValidationError } from "@/core/errors/domain-error"

export class AddWorkspaceMemberUseCase {
  constructor(private repository: IWorkspaceMemberRepository) {}

  async execute(workspaceId: string, data: AddWorkspaceMemberData): Promise<WorkspaceMember> {
    if (!data.email || !data.email.includes("@")) {
      throw new ValidationError("Invalid email address")
    }

    return this.repository.add(workspaceId, data)
  }
}
