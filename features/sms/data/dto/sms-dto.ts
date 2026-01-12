export interface SmsMessageDTO {
  id: string
  recipient_phone: string
  recipient_name: string
  message: string
  cost: number
  status: string
  sent_at?: string
  created_at: string
}

export interface SmsBalanceDTO {
  balance: number
  currency: string
}

export interface SendSmsRequestDTO {
  recipient_phone: string
  recipient_name: string
  message: string
}

export interface BroadcastSmsRequestDTO {
  recipients: { phone: string; name: string }[]
  message: string
}
