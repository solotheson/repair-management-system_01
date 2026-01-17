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

export interface BootstrapData {
  email: string
  password: string
  firstName: string
  lastName: string
  bootstrapToken: string
}

export interface AuthResponse {
  user: User
  accessToken: string
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>
  register(data: RegisterData): Promise<AuthResponse>
  bootstrapSuperadmin(data: BootstrapData): Promise<AuthResponse>
  logout(): Promise<void>
  getCurrentUser(): Promise<User>
}
