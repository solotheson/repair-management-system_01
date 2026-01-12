import type { IUserRepository, CreateUserData } from "../repositories/user-repository"
import type { ManagedUser } from "../entities/managed-user"
import { ValidationError } from "@/core/errors/domain-error"
import { UserRole } from "@/features/auth/domain/enums/user-role"

export class CreateUserUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(data: CreateUserData): Promise<ManagedUser> {
    if (!data.name || data.name.length < 2) {
      throw new ValidationError("Name must be at least 2 characters")
    }
    if (!data.email || !data.email.includes("@")) {
      throw new ValidationError("Invalid email address")
    }
    if (!data.password || data.password.length < 6) {
      throw new ValidationError("Password must be at least 6 characters")
    }
    if (!Object.values(UserRole).includes(data.role)) {
      throw new ValidationError("Invalid role")
    }

    return this.repository.create(data)
  }
}
