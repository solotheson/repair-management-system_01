import type {
  IServiceRepository,
  CreateServiceData,
  UpdateServiceData,
} from "../../domain/repositories/service-repository"
import type { Service } from "../../domain/entities/service"
import type { ServiceStatus } from "../../domain/enums/service-status"
import { ServiceDatasource } from "../datasources/service-datasource"
import { ServiceMapper } from "../mappers/service-mapper"

export class ServiceRepositoryImpl implements IServiceRepository {
  private datasource = new ServiceDatasource()

  async getAll(): Promise<Service[]> {
    const dtos = await this.datasource.getAll()
    return ServiceMapper.toEntityList(dtos)
  }

  async getById(id: string): Promise<Service> {
    const dto = await this.datasource.getById(id)
    return ServiceMapper.toEntity(dto)
  }

  async create(data: CreateServiceData): Promise<Service> {
    const dto = await this.datasource.create({
      title: data.title,
      description: data.description,
      customer_id: data.customerId,
      scheduled_at: data.scheduledAt,
      price: data.price,
      notes: data.notes,
    })
    return ServiceMapper.toEntity(dto)
  }

  async update(id: string, data: UpdateServiceData): Promise<Service> {
    const dto = await this.datasource.update(id, {
      title: data.title,
      description: data.description,
      status: data.status,
      scheduled_at: data.scheduledAt,
      price: data.price,
      notes: data.notes,
    })
    return ServiceMapper.toEntity(dto)
  }

  async delete(id: string): Promise<void> {
    await this.datasource.delete(id)
  }

  async updateStatus(id: string, status: ServiceStatus): Promise<Service> {
    const dto = await this.datasource.updateStatus(id, status)
    return ServiceMapper.toEntity(dto)
  }
}
