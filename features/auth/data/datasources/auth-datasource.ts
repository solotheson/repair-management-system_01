import { axiosInstance } from "@/core/api/axios-instance"
import type { LoginRequestDTO, RegisterRequestDTO, AuthResponseDTO, UserDTO } from "../dto/auth-dto"

export class AuthDatasource {
  async login(data: LoginRequestDTO): Promise<AuthResponseDTO> {
    const response = await axiosInstance.post<AuthResponseDTO>("/auth/login", data)
    return response.data
  }

  async register(data: RegisterRequestDTO): Promise<AuthResponseDTO> {
    const response = await axiosInstance.post<AuthResponseDTO>("/auth/register", data)
    return response.data
  }

  async logout(): Promise<void> {
    await axiosInstance.post("/auth/logout")
  }

  async getCurrentUser(): Promise<UserDTO> {
    const response = await axiosInstance.get<UserDTO>("/auth/me")
    return response.data
  }
}
