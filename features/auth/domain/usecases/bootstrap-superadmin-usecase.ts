import type { IAuthRepository, BootstrapData, AuthResponse } from "../repositories/auth-repository"
import { ValidationError } from "@/core/errors/domain-error"

export class BootstrapSuperadminUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: BootstrapData): Promise<AuthResponse> {
    if (!data.email || !data.email.includes("@")) {
      throw new ValidationError("Invalid email address")
    }
    if (!data.password || data.password.length < 6) {
      throw new ValidationError("Password must be at least 6 characters")
    }
    if (!data.firstName || data.firstName.length < 2) {
      throw new ValidationError("First name must be at least 2 characters")
    }
    if (!data.lastName || data.lastName.length < 2) {
      throw new ValidationError("Last name must be at least 2 characters")
    }
    if (!data.bootstrapToken) {
      throw new ValidationError("Bootstrap token is required")
    }

    return this.authRepository.bootstrapSuperadmin(data)
  }
}
