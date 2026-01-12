import { axiosInstance } from "@/core/api/axios-instance"
import type { ServiceDTO, CreateServiceRequestDTO, UpdateServiceRequestDTO } from "../dto/service-dto"

export class ServiceDatasource {
  async getAll(): Promise<ServiceDTO[]> {
    const response = await axiosInstance.get<ServiceDTO[]>("/services")
    return response.data
  }

  async getById(id: string): Promise<ServiceDTO> {
    const response = await axiosInstance.get<ServiceDTO>(`/services/${id}`)
    return response.data
  }

  async create(data: CreateServiceRequestDTO): Promise<ServiceDTO> {
    const response = await axiosInstance.post<ServiceDTO>("/services", data)
    return response.data
  }

  async update(id: string, data: UpdateServiceRequestDTO): Promise<ServiceDTO> {
    const response = await axiosInstance.put<ServiceDTO>(`/services/${id}`, data)
    return response.data
  }

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/services/${id}`)
  }

  async updateStatus(id: string, status: string): Promise<ServiceDTO> {
    const response = await axiosInstance.patch<ServiceDTO>(`/services/${id}/status`, { status })
    return response.data
  }
}
