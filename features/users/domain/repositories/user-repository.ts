import type { ManagedUser } from "../entities/managed-user"
import type { UserRole } from "@/features/auth/domain/enums/user-role"

export interface CreateUserData {
  name: string
  email: string
  password: string
  phone?: string
  role: UserRole
}

export interface UpdateUserData {
  name?: string
  email?: string
  phone?: string
  role?: UserRole
  isActive?: boolean
}

export interface IUserRepository {
  getAll(): Promise<ManagedUser[]>
  getById(id: string): Promise<ManagedUser>
  create(data: CreateUserData): Promise<ManagedUser>
  update(id: string, data: UpdateUserData): Promise<ManagedUser>
  delete(id: string): Promise<void>
}
