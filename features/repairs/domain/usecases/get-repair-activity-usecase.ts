import type { IRepairRepository } from "../repositories/repair-repository"
import type { RepairActivity } from "../entities/repair"

export class GetRepairActivityUseCase {
  constructor(private repository: IRepairRepository) {}

  async execute(workspaceId: string, repairId: string): Promise<RepairActivity[]> {
    return this.repository.getActivity(workspaceId, repairId)
  }
}

