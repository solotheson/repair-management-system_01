import type { IRepairRepository } from "../repositories/repair-repository"
import type { Repair } from "../entities/repair"

export class ListRepairsUseCase {
  constructor(private repository: IRepairRepository) {}

  async execute(workspaceId: string): Promise<Repair[]> {
    return this.repository.list(workspaceId)
  }
}

