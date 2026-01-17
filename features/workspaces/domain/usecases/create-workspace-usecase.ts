import type { IWorkspaceRepository, CreateWorkspaceData } from "../repositories/workspace-repository"
import type { Workspace } from "../entities/workspace"
import { ValidationError } from "@/core/errors/domain-error"

export class CreateWorkspaceUseCase {
  constructor(private repository: IWorkspaceRepository) {}

  async execute(data: CreateWorkspaceData): Promise<Workspace> {
    if (!data.name || data.name.length < 2) {
      throw new ValidationError("Workspace name must be at least 2 characters")
    }

    return this.repository.create(data)
  }
}

