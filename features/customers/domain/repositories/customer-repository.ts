import type { Customer } from "../entities/customer"

export interface CreateCustomerData {
  name: string
  email: string
  phone: string
  address?: string
}

export interface UpdateCustomerData {
  name?: string
  email?: string
  phone?: string
  address?: string
}

export interface ICustomerRepository {
  getAll(): Promise<Customer[]>
  getById(id: string): Promise<Customer>
  create(data: CreateCustomerData): Promise<Customer>
  update(id: string, data: UpdateCustomerData): Promise<Customer>
  delete(id: string): Promise<void>
}
