import type { IServiceRepository, CreateServiceData } from "../../domain/repositories/service-repository"
import type { Service } from "../../domain/entities/service"
import { ServiceDatasource } from "../datasources/service-datasource"
import { ServiceMapper } from "../mappers/service-mapper"

export class ServiceRepositoryImpl implements IServiceRepository {
  private datasource = new ServiceDatasource()

  async list(workspaceId: string): Promise<Service[]> {
    const dtos = await this.datasource.list(workspaceId)
    return ServiceMapper.toEntityList(dtos ?? [])
  }

  async create(workspaceId: string, data: CreateServiceData): Promise<Service> {
    const dto = await this.datasource.create(workspaceId, {
      customer: {
        name: data.customer.name,
        telephone_number: data.customer.telephoneNumber,
      },
      issue_description: data.issueDescription,
      message: data.message ?? null,
      item: data.item
        ? {
            type: data.item.type ?? null,
            brand: data.item.brand ?? null,
            model: data.item.model ?? null,
            serial_number: data.item.serialNumber ?? null,
          }
        : undefined,
    })
    if (!dto) {
      throw new Error("Failed to create service")
    }
    return ServiceMapper.toEntity(dto)
  }

  async complete(
    workspaceId: string,
    serviceId: string,
    message?: string | null,
  ): Promise<Service> {
    const dto = await this.datasource.complete(workspaceId, serviceId, message ?? null)
    if (!dto) {
      throw new Error("Failed to complete service")
    }
    return ServiceMapper.toEntity(dto)
  }

  async sendMessage(
    workspaceId: string,
    serviceId: string,
    message: string,
  ): Promise<void> {
    await this.datasource.sendMessage(workspaceId, serviceId, { message })
  }
}
