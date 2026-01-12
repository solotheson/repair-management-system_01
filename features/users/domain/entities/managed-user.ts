import type { UserRole } from "@/features/auth/domain/enums/user-role"

export interface ManagedUser {
  id: string
  name: string
  email: string
  phone?: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface UsersState {
  users: ManagedUser[]
  selectedUser: ManagedUser | null
  isLoading: boolean
  error: string | null
}
