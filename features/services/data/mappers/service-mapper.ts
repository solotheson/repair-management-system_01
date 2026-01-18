import type { Service } from "../../domain/entities/service"
import type { ServiceDTO } from "../dto/service-dto"
export class ServiceMapper {
  static toEntity(dto: ServiceDTO): Service {
    return {
      id: dto.id,
      title: dto.issue_description ?? "",
      description: dto.issue_description ?? "",
      status: dto.status as any,
      customerId: "",
      customerName: dto.customer.name ?? "",
      customerPhone: dto.customer.telephone_number ?? "",
      technicianId: "",
      technicianName: "",
      scheduledAt: dto.received_at,
      completedAt: dto.completed_at ?? undefined,
      price: 0,
      notes: undefined,
      createdAt: dto.created_at,
      updatedAt: dto.created_at,
    }
  }

  static toEntityList(dtos: ServiceDTO[]): Service[] {
    return dtos.map(this.toEntity)
  }
}
