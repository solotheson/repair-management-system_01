import type { SmsMessage, SmsBalance } from "../../domain/entities/sms-message"
import type { SmsMessageDTO, SmsBalanceDTO } from "../dto/sms-dto"

export class SmsMapper {
  static toMessage(dto: SmsMessageDTO): SmsMessage {
    return {
      id: dto.id,
      recipientPhone: dto.recipient_phone,
      recipientName: dto.recipient_name,
      message: dto.message,
      cost: dto.cost,
      status: dto.status as SmsMessage["status"],
      sentAt: dto.sent_at,
      createdAt: dto.created_at,
    }
  }

  static toMessageList(dtos: SmsMessageDTO[]): SmsMessage[] {
    return dtos.map(this.toMessage)
  }

  static toBalance(dto: SmsBalanceDTO): SmsBalance {
    return {
      balance: dto.balance,
      currency: dto.currency,
    }
  }
}
