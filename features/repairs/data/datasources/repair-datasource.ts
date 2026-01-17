import { axiosInstance } from "@/core/api/axios-instance"
import type {
  RepairDTO,
  RepairActivityDTO,
  CreateRepairRequestDTO,
  SendRepairMessageRequestDTO,
} from "../dto/repair-dto"

export class RepairDatasource {
  async list(workspaceId: string): Promise<RepairDTO[]> {
    const response = await axiosInstance.get<RepairDTO[]>(
      `/v1/workspaces/${workspaceId}/repairs`,
    )
    return response.data
  }

  async create(workspaceId: string, data: CreateRepairRequestDTO): Promise<RepairDTO> {
    const response = await axiosInstance.post<RepairDTO>(
      `/v1/workspaces/${workspaceId}/repairs`,
      data,
    )
    return response.data
  }

  async complete(workspaceId: string, repairId: string): Promise<RepairDTO> {
    const response = await axiosInstance.post<RepairDTO>(
      `/v1/workspaces/${workspaceId}/repairs/${repairId}/complete`,
    )
    return response.data
  }

  async sendMessage(
    workspaceId: string,
    repairId: string,
    data: SendRepairMessageRequestDTO,
  ): Promise<RepairActivityDTO> {
    const response = await axiosInstance.post<RepairActivityDTO>(
      `/v1/workspaces/${workspaceId}/repairs/${repairId}/message`,
      data,
    )
    return response.data
  }

  async getActivity(workspaceId: string, repairId: string): Promise<RepairActivityDTO[]> {
    const response = await axiosInstance.get<RepairActivityDTO[]>(
      `/v1/workspaces/${workspaceId}/repairs/${repairId}/activity`,
    )
    return response.data
  }
}

