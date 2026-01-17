export interface LoginRequestDTO {
  id: string
  password: string
}

export interface RegisterRequestDTO {
  email: string
  password: string
  name: string
  phone?: string
}

export interface BootstrapRequestDTO {
  email: string
  password: string
  first_name: string
  last_name: string
}

export interface UserDTO {
  id: string
  email: string
  name: string
  role: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface AuthResponseDTO {
  user: UserDTO
  access_token: string
}
