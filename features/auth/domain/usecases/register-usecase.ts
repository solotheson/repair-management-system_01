import type { IAuthRepository, RegisterData, AuthResponse } from "../repositories/auth-repository"
import { ValidationError } from "@/core/errors/domain-error"

export class RegisterUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: RegisterData): Promise<AuthResponse> {
    if (!data.email || !data.email.includes("@")) {
      throw new ValidationError("Invalid email address")
    }
    if (!data.password || data.password.length < 6) {
      throw new ValidationError("Password must be at least 6 characters")
    }
    if (!data.name || data.name.length < 2) {
      throw new ValidationError("Name must be at least 2 characters")
    }

    return this.authRepository.register(data)
  }
}
