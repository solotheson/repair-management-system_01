import type { SmsMessage, SmsBalance } from "../entities/sms-message"

export interface SendSmsData {
  recipientPhone: string
  recipientName: string
  message: string
}

export interface BroadcastSmsData {
  recipients: { phone: string; name: string }[]
  message: string
}

export interface ISmsRepository {
  getBalance(): Promise<SmsBalance>
  sendSms(data: SendSmsData): Promise<SmsMessage>
  broadcastSms(data: BroadcastSmsData): Promise<SmsMessage[]>
  getHistory(): Promise<SmsMessage[]>
  purchaseCredits(amount: number): Promise<SmsBalance>
}
