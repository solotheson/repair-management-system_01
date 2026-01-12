import type { ISmsRepository, SendSmsData, BroadcastSmsData } from "../../domain/repositories/sms-repository"
import type { SmsMessage, SmsBalance } from "../../domain/entities/sms-message"
import { SmsDatasource } from "../datasources/sms-datasource"
import { SmsMapper } from "../mappers/sms-mapper"

export class SmsRepositoryImpl implements ISmsRepository {
  private datasource = new SmsDatasource()

  async getBalance(): Promise<SmsBalance> {
    const dto = await this.datasource.getBalance()
    return SmsMapper.toBalance(dto)
  }

  async sendSms(data: SendSmsData): Promise<SmsMessage> {
    const dto = await this.datasource.sendSms({
      recipient_phone: data.recipientPhone,
      recipient_name: data.recipientName,
      message: data.message,
    })
    return SmsMapper.toMessage(dto)
  }

  async broadcastSms(data: BroadcastSmsData): Promise<SmsMessage[]> {
    const dtos = await this.datasource.broadcastSms({
      recipients: data.recipients,
      message: data.message,
    })
    return SmsMapper.toMessageList(dtos)
  }

  async getHistory(): Promise<SmsMessage[]> {
    const dtos = await this.datasource.getHistory()
    return SmsMapper.toMessageList(dtos)
  }

  async purchaseCredits(amount: number): Promise<SmsBalance> {
    const dto = await this.datasource.purchaseCredits(amount)
    return SmsMapper.toBalance(dto)
  }
}
