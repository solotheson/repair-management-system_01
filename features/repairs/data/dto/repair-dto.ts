export interface RepairDTO {
  id: string
  workspace_id: string
  title: string
  description?: string
  status: string
  customer_name?: string
  customer_phone?: string
  created_at: string
  updated_at: string
}

export interface RepairActivityDTO {
  id: string
  repair_id: string
  type: string
  message: string
  created_at: string
  created_by_name?: string
}

export interface CreateRepairRequestDTO {
  title: string
  description?: string
  customer_name?: string
  customer_phone?: string
}

export interface SendRepairMessageRequestDTO {
  message: string
}

