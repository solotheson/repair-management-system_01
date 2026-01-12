import type { User } from "../entities/user"

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  phone?: string
}

export interface AuthResponse {
  user: User
  accessToken: string
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>
  register(data: RegisterData): Promise<AuthResponse>
  logout(): Promise<void>
  getCurrentUser(): Promise<User>
}
