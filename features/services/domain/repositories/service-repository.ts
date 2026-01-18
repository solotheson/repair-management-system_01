import type { Service } from "../entities/service"
export interface ServiceCustomerData {
  name: string
  telephoneNumber: string
}

export interface ServiceItemData {
  type?: string
  brand?: string
  model?: string
  serialNumber?: string
}

export interface CreateServiceData {
  customer: ServiceCustomerData
  issueDescription: string
  message?: string | null
  item?: ServiceItemData
}

export interface IServiceRepository {
  list(workspaceId: string): Promise<Service[]>
  create(workspaceId: string, data: CreateServiceData): Promise<Service>
  complete(workspaceId: string, serviceId: string): Promise<Service>
}
