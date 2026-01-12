import type { User } from "../../domain/entities/user"
import type { AuthResponse } from "../../domain/repositories/auth-repository"
import type { UserDTO, AuthResponseDTO } from "../dto/auth-dto"
import type { UserRole } from "../../domain/enums/user-role"

export class AuthMapper {
  static toUser(dto: UserDTO): User {
    return {
      id: dto.id,
      email: dto.email,
      name: dto.name,
      role: dto.role as UserRole,
      phone: dto.phone,
      createdAt: dto.created_at,
      updatedAt: dto.updated_at,
    }
  }

  static toAuthResponse(dto: AuthResponseDTO): AuthResponse {
    return {
      user: this.toUser(dto.user),
      accessToken: dto.access_token,
    }
  }
}
