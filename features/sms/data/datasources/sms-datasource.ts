import { axiosInstance } from "@/core/api/axios-instance"
import type { SmsMessageDTO, SmsBalanceDTO, SendSmsRequestDTO, BroadcastSmsRequestDTO } from "../dto/sms-dto"

export class SmsDatasource {
  async getBalance(): Promise<SmsBalanceDTO> {
    const response = await axiosInstance.get<SmsBalanceDTO>("/sms/balance")
    return response.data
  }

  async sendSms(data: SendSmsRequestDTO): Promise<SmsMessageDTO> {
    const response = await axiosInstance.post<SmsMessageDTO>("/sms/send", data)
    return response.data
  }

  async broadcastSms(data: BroadcastSmsRequestDTO): Promise<SmsMessageDTO[]> {
    const response = await axiosInstance.post<SmsMessageDTO[]>("/sms/broadcast", data)
    return response.data
  }

  async getHistory(): Promise<SmsMessageDTO[]> {
    const response = await axiosInstance.get<SmsMessageDTO[]>("/sms/history")
    return response.data
  }

  async purchaseCredits(amount: number): Promise<SmsBalanceDTO> {
    const response = await axiosInstance.post<SmsBalanceDTO>("/sms/purchase", { amount })
    return response.data
  }
}
