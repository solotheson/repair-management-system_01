export interface CustomerDTO {
  id: string
  name: string
  owner_email: string
  owner_first_name: string | null
  owner_last_name: string | null
  owner_telephone_number: string | null
  created_at: string
  updated_at: string
}

export interface CreateCustomerRequestDTO {
  name: string
  owner: {
    email: string
    password: string
    first_name?: string | null
    last_name?: string | null
    telephone_number?: string | null
  }
}

export interface UpdateCustomerRequestDTO {
  name?: string
}
