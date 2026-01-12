import type { Service } from "../../domain/entities/service"
import type { ServiceDTO } from "../dto/service-dto"
import type { ServiceStatus } from "../../domain/enums/service-status"

export class ServiceMapper {
  static toEntity(dto: ServiceDTO): Service {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      status: dto.status as ServiceStatus,
      customerId: dto.customer_id,
      customerName: dto.customer_name,
      customerPhone: dto.customer_phone,
      technicianId: dto.technician_id,
      technicianName: dto.technician_name,
      scheduledAt: dto.scheduled_at,
      completedAt: dto.completed_at,
      price: dto.price,
      notes: dto.notes,
      createdAt: dto.created_at,
      updatedAt: dto.updated_at,
    }
  }

  static toEntityList(dtos: ServiceDTO[]): Service[] {
    return dtos.map(this.toEntity)
  }
}
