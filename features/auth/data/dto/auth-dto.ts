export interface LoginRequestDTO {
  email: string
  password: string
}

export interface RegisterRequestDTO {
  email: string
  password: string
  name: string
  phone?: string
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
