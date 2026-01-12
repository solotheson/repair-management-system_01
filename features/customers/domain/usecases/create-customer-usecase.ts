import type { ICustomerRepository, CreateCustomerData } from "../repositories/customer-repository"
import type { Customer } from "../entities/customer"
import { ValidationError } from "@/core/errors/domain-error"

export class CreateCustomerUseCase {
  constructor(private repository: ICustomerRepository) {}

  async execute(data: CreateCustomerData): Promise<Customer> {
    if (!data.name || data.name.length < 2) {
      throw new ValidationError("Name must be at least 2 characters")
    }
    if (!data.email || !data.email.includes("@")) {
      throw new ValidationError("Invalid email address")
    }
    if (!data.phone || data.phone.length < 10) {
      throw new ValidationError("Invalid phone number")
    }

    return this.repository.create(data)
  }
}
