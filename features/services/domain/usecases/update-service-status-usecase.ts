import type { IServiceRepository } from "../repositories/service-repository"
import type { Service } from "../entities/service"
import { ServiceStatus } from "../enums/service-status"
import { ValidationError } from "@/core/errors/domain-error"

export class UpdateServiceStatusUseCase {
  constructor(private repository: IServiceRepository) {}

  async execute(id: string, status: ServiceStatus): Promise<Service> {
    if (!id) {
      throw new ValidationError("Service ID is required")
    }
    if (!Object.values(ServiceStatus).includes(status)) {
      throw new ValidationError("Invalid status")
    }

    return this.repository.updateStatus(id, status)
  }
}
