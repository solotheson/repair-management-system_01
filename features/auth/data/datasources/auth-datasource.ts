import { axiosInstance } from "@/core/api/axios-instance"
import type { LoginRequestDTO, RegisterRequestDTO, BootstrapRequestDTO, AuthResponseDTO, UserDTO } from "../dto/auth-dto"

export class AuthDatasource {
  async login(data: LoginRequestDTO): Promise<AuthResponseDTO> {
    const response = await axiosInstance.post<AuthResponseDTO>("/v1/auth/login", data)
    return response.data
  }

  async register(data: RegisterRequestDTO): Promise<AuthResponseDTO> {
    const response = await axiosInstance.post<AuthResponseDTO>("/auth/register", data)
    return response.data
  }

  async bootstrapSuperadmin(data: BootstrapRequestDTO, token: string): Promise<AuthResponseDTO> {
    const response = await axiosInstance.post<AuthResponseDTO>("/repair/admin/v1/superadmin/bootstrap", data, {
      headers: {
        "X-Bootstrap-Token": token,
      },
    })
    return response.data
  }

  async logout(): Promise<void> {
    await axiosInstance.post("/auth/logout")
  }

  async getCurrentUser(): Promise<UserDTO> {
    const response = await axiosInstance.get<UserDTO>("/v1/auth/me")
    return response.data
  }
}
