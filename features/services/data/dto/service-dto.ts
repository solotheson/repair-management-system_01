export interface ServiceDTO {
  id: string
  title: string
  description: string
  status: string
  customer_id: string
  customer_name: string
  customer_phone: string
  technician_id: string
  technician_name: string
  scheduled_at: string
  completed_at?: string
  price: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface CreateServiceRequestDTO {
  title: string
  description: string
  customer_id: string
  scheduled_at: string
  price: number
  notes?: string
}

export interface UpdateServiceRequestDTO {
  title?: string
  description?: string
  status?: string
  scheduled_at?: string
  price?: number
  notes?: string
}
