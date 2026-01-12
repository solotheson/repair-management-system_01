import type { ServiceStatus } from "../enums/service-status"

export interface Service {
  id: string
  title: string
  description: string
  status: ServiceStatus
  customerId: string
  customerName: string
  customerPhone: string
  technicianId: string
  technicianName: string
  scheduledAt: string
  completedAt?: string
  price: number
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface ServiceState {
  services: Service[]
  selectedService: Service | null
  isLoading: boolean
  error: string | null
}
