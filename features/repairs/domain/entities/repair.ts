export interface Repair {
  id: string
  workspaceId: string
  title: string
  description?: string
  status: string
  customerName?: string
  customerPhone?: string
  createdAt: string
  updatedAt: string
}

export interface RepairActivity {
  id: string
  repairId: string
  type: string
  message: string
  createdAt: string
  createdByName?: string
}

export interface RepairsState {
  items: Repair[]
  selectedRepairId: string | null
  activityByRepairId: Record<string, RepairActivity[]>
  isLoading: boolean
  isActivityLoading: boolean
  error: string | null
}

