import type { IRepairRepository, CreateRepairData } from "../repositories/repair-repository"
import type { Repair } from "../entities/repair"
import { ValidationError } from "@/core/errors/domain-error"

export class CreateRepairUseCase {
  constructor(private repository: IRepairRepository) {}

  async execute(workspaceId: string, data: CreateRepairData): Promise<Repair> {
    if (!data.title || data.title.length < 3) {
      throw new ValidationError("Title must be at least 3 characters")
    }

    return this.repository.create(workspaceId, data)
  }
}

