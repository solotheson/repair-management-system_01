import type { ISmsRepository, SendSmsData } from "../repositories/sms-repository"
import type { SmsMessage } from "../entities/sms-message"
import { ValidationError, InsufficientBalanceError } from "@/core/errors/domain-error"

const SMS_COST = 40 // TSH per SMS

export class SendSmsUseCase {
  constructor(private repository: ISmsRepository) {}

  async execute(data: SendSmsData, currentBalance: number): Promise<SmsMessage> {
    if (!data.recipientPhone || data.recipientPhone.length < 10) {
      throw new ValidationError("Invalid phone number")
    }
    if (!data.message || data.message.length < 1) {
      throw new ValidationError("Message cannot be empty")
    }
    if (currentBalance < SMS_COST) {
      throw new InsufficientBalanceError(`Insufficient balance. Need ${SMS_COST} TSH, have ${currentBalance} TSH`)
    }

    return this.repository.sendSms(data)
  }
}
