import { axiosInstance } from "@/core/api/axios-instance"
import type { CustomerDTO, CreateCustomerRequestDTO, UpdateCustomerRequestDTO } from "../dto/customer-dto"

export class CustomerDatasource {
  async getAll(): Promise<CustomerDTO[] | null> {
    try {
      const response = await axiosInstance.get<CustomerDTO[]>("/customers")
      return response.data
    } catch (error) {
      console.error("Failed to fetch customers", error)
      return null
    }
  }

  async getById(id: string): Promise<CustomerDTO | null> {
    try {
      const response = await axiosInstance.get<CustomerDTO>(`/customers/${id}`)
      return response.data
    } catch (error) {
      console.error("Failed to fetch customer", error)
      return null
    }
  }

  async create(data: CreateCustomerRequestDTO): Promise<CustomerDTO | null> {
    try {
      const response = await axiosInstance.post<CustomerDTO>("/admin/v1/workspaces", data)
      return response.data
    } catch (error) {
      console.error("Failed to create customer/member workspace", error)
      return null
    }
  }

  async update(id: string, data: UpdateCustomerRequestDTO): Promise<CustomerDTO | null> {
    try {
      const response = await axiosInstance.put<CustomerDTO>(`/customers/${id}`, data)
      return response.data
    } catch (error) {
      console.error("Failed to update customer", error)
      return null
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/customers/${id}`)
    } catch (error) {
      console.error("Failed to delete customer", error)
    }
  }
}
