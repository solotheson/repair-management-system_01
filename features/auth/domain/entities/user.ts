import type { UserRole } from "../enums/user-role"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
