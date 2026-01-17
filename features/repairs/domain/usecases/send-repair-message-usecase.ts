import type {
  IRepairRepository,
  SendRepairMessageData,
} from "../repositories/repair-repository"
import type { RepairActivity } from "../entities/repair"
import { ValidationError } from "@/core/errors/domain-error"

export class SendRepairMessageUseCase {
  constructor(private repository: IRepairRepository) {}

  async execute(
    workspaceId: string,
    repairId: string,
    data: SendRepairMessageData,
  ): Promise<RepairActivity> {
    if (!data.message || data.message.length < 1) {
      throw new ValidationError("Message is required")
    }

    return this.repository.sendMessage(workspaceId, repairId, data)
  }
}

