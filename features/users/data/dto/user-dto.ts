export interface ManagedUserDTO {
  id: string
  name: string
  email: string
  phone?: string
  role: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateUserRequestDTO {
  name: string
  email: string
  password: string
  phone?: string
  role: string
}

export interface UpdateUserRequestDTO {
  name?: string
  email?: string
  phone?: string
  role?: string
  is_active?: boolean
}
