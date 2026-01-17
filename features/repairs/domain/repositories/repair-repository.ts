import type { Repair, RepairActivity } from "../entities/repair"

export interface CreateRepairData {
  title: string
  description?: string
  customerName?: string
  customerPhone?: string
}

export interface SendRepairMessageData {
  message: string
}

export interface IRepairRepository {
  list(workspaceId: string): Promise<Repair[]>
  create(workspaceId: string, data: CreateRepairData): Promise<Repair>
  complete(workspaceId: string, repairId: string): Promise<Repair>
  sendMessage(
    workspaceId: string,
    repairId: string,
    data: SendRepairMessageData,
  ): Promise<RepairActivity>
  getActivity(workspaceId: string, repairId: string): Promise<RepairActivity[]>
}

