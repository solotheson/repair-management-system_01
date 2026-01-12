import type { ManagedUser } from "../../domain/entities/managed-user"
import type { ManagedUserDTO } from "../dto/user-dto"
import type { UserRole } from "@/features/auth/domain/enums/user-role"

export class UserMapper {
  static toEntity(dto: ManagedUserDTO): ManagedUser {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      role: dto.role as UserRole,
      isActive: dto.is_active,
      createdAt: dto.created_at,
      updatedAt: dto.updated_at,
    }
  }

  static toEntityList(dtos: ManagedUserDTO[]): ManagedUser[] {
    return dtos.map(this.toEntity)
  }
}
