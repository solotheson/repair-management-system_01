import type { Customer } from "../../domain/entities/customer"
import type { CustomerDTO } from "../dto/customer-dto"

export class CustomerMapper {
  static toEntity(dto: CustomerDTO): Customer {
    const ownerName = [dto.owner_first_name, dto.owner_last_name].filter(Boolean).join(" ")
    return {
      id: dto.id,
      name: dto.name,
      email: dto.owner_email,
      phone: dto.owner_telephone_number ?? "",
      address: ownerName || undefined,
      createdAt: dto.created_at,
      updatedAt: dto.updated_at,
    }
  }

  static toEntityList(dtos: CustomerDTO[]): Customer[] {
    return dtos.map(this.toEntity)
  }
}
