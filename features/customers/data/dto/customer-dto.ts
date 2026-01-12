export interface CustomerDTO {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  created_at: string
  updated_at: string
}

export interface CreateCustomerRequestDTO {
  name: string
  email: string
  phone: string
  address?: string
}

export interface UpdateCustomerRequestDTO {
  name?: string
  email?: string
  phone?: string
  address?: string
}
