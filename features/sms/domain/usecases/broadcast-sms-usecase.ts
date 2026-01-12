import type { ISmsRepository, BroadcastSmsData } from "../repositories/sms-repository"
import type { SmsMessage } from "../entities/sms-message"
import { ValidationError, InsufficientBalanceError } from "@/core/errors/domain-error"

const SMS_COST = 40 // TSH per SMS

export class BroadcastSmsUseCase {
  constructor(private repository: ISmsRepository) {}

  async execute(data: BroadcastSmsData, currentBalance: number): Promise<SmsMessage[]> {
    if (!data.recipients || data.recipients.length === 0) {
      throw new ValidationError("At least one recipient is required")
    }
    if (!data.message || data.message.length < 1) {
      throw new ValidationError("Message cannot be empty")
    }

    const totalCost = data.recipients.length * SMS_COST
    if (currentBalance < totalCost) {
      throw new InsufficientBalanceError(
        `Insufficient balance. Need ${totalCost} TSH for ${data.recipients.length} messages, have ${currentBalance} TSH`,
      )
    }

    return this.repository.broadcastSms(data)
  }

  calculateCost(recipientCount: number): number {
    return recipientCount * SMS_COST
  }
}
