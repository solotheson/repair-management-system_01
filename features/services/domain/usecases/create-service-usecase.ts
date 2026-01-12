import type { IServiceRepository, CreateServiceData } from "../repositories/service-repository"
import type { Service } from "../entities/service"
import { ValidationError } from "@/core/errors/domain-error"

export class CreateServiceUseCase {
  constructor(private repository: IServiceRepository) {}

  async execute(data: CreateServiceData): Promise<Service> {
    if (!data.title || data.title.length < 3) {
      throw new ValidationError("Title must be at least 3 characters")
    }
    if (!data.customerId) {
      throw new ValidationError("Customer is required")
    }
    if (!data.scheduledAt) {
      throw new ValidationError("Scheduled date is required")
    }
    if (data.price < 0) {
      throw new ValidationError("Price cannot be negative")
    }

    return this.repository.create(data)
  }
}
