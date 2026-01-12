import type { Service } from "../entities/service"
import type { ServiceStatus } from "../enums/service-status"

export interface CreateServiceData {
  title: string
  description: string
  customerId: string
  scheduledAt: string
  price: number
  notes?: string
}

export interface UpdateServiceData {
  title?: string
  description?: string
  status?: ServiceStatus
  scheduledAt?: string
  price?: number
  notes?: string
}

export interface IServiceRepository {
  getAll(): Promise<Service[]>
  getById(id: string): Promise<Service>
  create(data: CreateServiceData): Promise<Service>
  update(id: string, data: UpdateServiceData): Promise<Service>
  delete(id: string): Promise<void>
  updateStatus(id: string, status: ServiceStatus): Promise<Service>
}
