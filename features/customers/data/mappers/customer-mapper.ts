import type { Customer } from "../../domain/entities/customer"
import type { CustomerDTO } from "../dto/customer-dto"

export class CustomerMapper {
  static toEntity(dto: CustomerDTO): Customer {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      address: dto.address,
      createdAt: dto.created_at,
      updatedAt: dto.updated_at,
    }
  }

  static toEntityList(dtos: CustomerDTO[]): Customer[] {
    return dtos.map(this.toEntity)
  }
}
