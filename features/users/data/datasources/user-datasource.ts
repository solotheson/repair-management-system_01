import { axiosInstance } from "@/core/api/axios-instance"
import type { ManagedUserDTO, CreateUserRequestDTO, UpdateUserRequestDTO } from "../dto/user-dto"

export class UserDatasource {
  async getAll(): Promise<ManagedUserDTO[]> {
    const response = await axiosInstance.get<ManagedUserDTO[]>("/users")
    return response.data
  }

  async getById(id: string): Promise<ManagedUserDTO> {
    const response = await axiosInstance.get<ManagedUserDTO>(`/users/${id}`)
    return response.data
  }

  async create(data: CreateUserRequestDTO): Promise<ManagedUserDTO> {
    const response = await axiosInstance.post<ManagedUserDTO>("/users", data)
    return response.data
  }

  async update(id: string, data: UpdateUserRequestDTO): Promise<ManagedUserDTO> {
    const response = await axiosInstance.put<ManagedUserDTO>(`/users/${id}`, data)
    return response.data
  }

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/users/${id}`)
  }
}
