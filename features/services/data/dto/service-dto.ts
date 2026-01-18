export interface ServiceCustomerDTO {
  name: string
  telephone_number: string
}

export interface ServiceItemDTO {
  type?: string | null
  brand?: string | null
  model?: string | null
  serial_number?: string | null
}

export interface ServiceDTO {
  id: string
  status: string
  customer: ServiceCustomerDTO
  item?: ServiceItemDTO
  issue_description: string
  received_at: string
  completed_at: string | null
  created_at: string
}

export interface CreateServiceRequestDTO {
  customer: {
    name: string
    telephone_number: string
  }
  issue_description: string
  message?: string | null
  item?: {
    type?: string | null
    brand?: string | null
    model?: string | null
    serial_number?: string | null
  }
}

export interface ServiceMessageRequestDTO {
  message: string
}
