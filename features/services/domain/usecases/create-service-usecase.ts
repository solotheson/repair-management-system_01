import type { IServiceRepository, CreateServiceData } from "../repositories/service-repository"
import type { Service } from "../entities/service"
import { ValidationError } from "@/core/errors/domain-error"

export class CreateServiceUseCase {
  constructor(private repository: IServiceRepository) {}

  async execute(workspaceId: string, data: CreateServiceData): Promise<Service> {
    if (!data.issueDescription || data.issueDescription.trim().length < 3) {
      throw new ValidationError("Issue description must be at least 3 characters")
    }

    return this.repository.create(workspaceId, data)
  }
}
