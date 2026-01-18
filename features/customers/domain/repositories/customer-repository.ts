import type { Customer } from "../entities/customer"

export interface CreateCustomerData {
  name: string
  email: string
  password: string
  firstName?: string
  lastName?: string
  phone: string
}

export interface UpdateCustomerData {
  name?: string
}

export interface ICustomerRepository {
  getAll(): Promise<Customer[]>
  getById(id: string): Promise<Customer>
  create(data: CreateCustomerData): Promise<Customer>
  update(id: string, data: UpdateCustomerData): Promise<Customer>
  delete(id: string): Promise<void>
}
