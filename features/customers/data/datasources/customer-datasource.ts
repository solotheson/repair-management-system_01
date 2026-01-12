import { axiosInstance } from "@/core/api/axios-instance"
import type { CustomerDTO, CreateCustomerRequestDTO, UpdateCustomerRequestDTO } from "../dto/customer-dto"

export class CustomerDatasource {
  async getAll(): Promise<CustomerDTO[]> {
    const response = await axiosInstance.get<CustomerDTO[]>("/customers")
    return response.data
  }

  async getById(id: string): Promise<CustomerDTO> {
    const response = await axiosInstance.get<CustomerDTO>(`/customers/${id}`)
    return response.data
  }

  async create(data: CreateCustomerRequestDTO): Promise<CustomerDTO> {
    const response = await axiosInstance.post<CustomerDTO>("/customers", data)
    return response.data
  }

  async update(id: string, data: UpdateCustomerRequestDTO): Promise<CustomerDTO> {
    const response = await axiosInstance.put<CustomerDTO>(`/customers/${id}`, data)
    return response.data
  }

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/customers/${id}`)
  }
}
