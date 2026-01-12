import type { IAuthRepository, LoginCredentials, AuthResponse } from "../repositories/auth-repository"
import { ValidationError } from "@/core/errors/domain-error"

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<AuthResponse> {
    // Validation
    if (!credentials.email || !credentials.email.includes("@")) {
      throw new ValidationError("Invalid email address")
    }
    if (!credentials.password || credentials.password.length < 6) {
      throw new ValidationError("Password must be at least 6 characters")
    }

    return this.authRepository.login(credentials)
  }
}
