import type { IRepairRepository } from "../repositories/repair-repository"
import type { Repair } from "../entities/repair"

export class CompleteRepairUseCase {
  constructor(private repository: IRepairRepository) {}

  async execute(workspaceId: string, repairId: string): Promise<Repair> {
    return this.repository.complete(workspaceId, repairId)
  }
}

