import type {
  ICustomerRepository,
  CreateCustomerData,
  UpdateCustomerData,
} from "../../domain/repositories/customer-repository"
import type { Customer } from "../../domain/entities/customer"
import { CustomerDatasource } from "../datasources/customer-datasource"
import { CustomerMapper } from "../mappers/customer-mapper"

export class CustomerRepositoryImpl implements ICustomerRepository {
  private datasource = new CustomerDatasource()

  async getAll(): Promise<Customer[]> {
    const dtos = await this.datasource.getAll()
    return CustomerMapper.toEntityList(dtos)
  }

  async getById(id: string): Promise<Customer> {
    const dto = await this.datasource.getById(id)
    return CustomerMapper.toEntity(dto)
  }

  async create(data: CreateCustomerData): Promise<Customer> {
    const dto = await this.datasource.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    })
    return CustomerMapper.toEntity(dto)
  }

  async update(id: string, data: UpdateCustomerData): Promise<Customer> {
    const dto = await this.datasource.update(id, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    })
    return CustomerMapper.toEntity(dto)
  }

  async delete(id: string): Promise<void> {
    await this.datasource.delete(id)
  }
}
