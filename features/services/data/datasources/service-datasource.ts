import { axiosInstance } from "@/core/api/axios-instance"
import type { ServiceDTO, CreateServiceRequestDTO } from "../dto/service-dto"

export class ServiceDatasource {
  async list(workspaceId: string): Promise<ServiceDTO[] | null> {
    try {
      const response = await axiosInstance.get<{ repairs: ServiceDTO[] }>(
        `/v1/workspaces/${workspaceId}/repairs`,
      )
      return response.data.repairs
    } catch (error) {
      console.error("Failed to fetch services", error)
      return null
    }
  }

  async create(
    workspaceId: string,
    data: CreateServiceRequestDTO,
  ): Promise<ServiceDTO | null> {
    try {
      const response = await axiosInstance.post<ServiceDTO>(
        `/v1/workspaces/${workspaceId}/repairs`,
        data,
      )
      return response.data
    } catch (error) {
      console.error("Failed to create service", error)
      return null
    }
  }

  async complete(workspaceId: string, serviceId: string): Promise<ServiceDTO | null> {
    try {
      const response = await axiosInstance.post<ServiceDTO>(
        `/v1/workspaces/${workspaceId}/repairs/${serviceId}/complete`,
      )
      return response.data
    } catch (error) {
      console.error("Failed to complete service", error)
      return null
    }
  }
}
