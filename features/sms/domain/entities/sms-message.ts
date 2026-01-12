export interface SmsMessage {
  id: string
  recipientPhone: string
  recipientName: string
  message: string
  cost: number
  status: "PENDING" | "SENT" | "FAILED"
  sentAt?: string
  createdAt: string
}

export interface SmsBalance {
  balance: number
  currency: string
}

export interface SmsState {
  messages: SmsMessage[]
  balance: SmsBalance
  isLoading: boolean
  error: string | null
}
