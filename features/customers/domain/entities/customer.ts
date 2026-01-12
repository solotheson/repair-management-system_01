export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  createdAt: string
  updatedAt: string
}

export interface CustomerState {
  customers: Customer[]
  selectedCustomer: Customer | null
  isLoading: boolean
  error: string | null
}
