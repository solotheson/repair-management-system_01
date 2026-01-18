import type { User } from "../../domain/entities/user"
import type { AuthResponse } from "../../domain/repositories/auth-repository"
import type { UserDTO, AuthResponseDTO } from "../dto/auth-dto"
import { UserRole } from "../../domain/enums/user-role"

export class AuthMapper {
  static toUser(dto: UserDTO): User {
    const fullName = [dto.first_name, dto.last_name].filter(Boolean).join(" ")

    let mappedRole: UserRole
    switch (dto.role) {
      case "superadmin":
        mappedRole = UserRole.SUPER_ADMIN
        break
      case "technician":
        mappedRole = UserRole.MAIN_TECHNICIAN
        break
      case "customer":
        mappedRole = UserRole.CUSTOMER
        break
      default:
        mappedRole = UserRole.CUSTOMER
        break
    }

    return {
      id: dto.id,
      email: dto.email,
      name: fullName,
      role: mappedRole,
      phone: dto.telephone_number ?? undefined,
      createdAt: "",
      updatedAt: "",
    }
  }

  static toAuthResponse(dto: AuthResponseDTO): AuthResponse {
    return {
      user: this.toUser(dto.user),
      accessToken: dto.access_token,
    }
  }
}
