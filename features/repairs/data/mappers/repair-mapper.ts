import type { Repair, RepairActivity } from "../../domain/entities/repair"
import type { RepairDTO, RepairActivityDTO } from "../dto/repair-dto"

export class RepairMapper {
  static toRepair(dto: RepairDTO): Repair {
    return {
      id: dto.id,
      workspaceId: dto.workspace_id,
      title: dto.title,
      description: dto.description,
      status: dto.status,
      customerName: dto.customer_name,
      customerPhone: dto.customer_phone,
      createdAt: dto.created_at,
      updatedAt: dto.updated_at,
    }
  }

  static toRepairList(dtos: RepairDTO[]): Repair[] {
    return dtos.map(this.toRepair)
  }

  static toRepairActivity(dto: RepairActivityDTO): RepairActivity {
    return {
      id: dto.id,
      repairId: dto.repair_id,
      type: dto.type,
      message: dto.message,
      createdAt: dto.created_at,
      createdByName: dto.created_by_name,
    }
  }

  static toRepairActivityList(dtos: RepairActivityDTO[]): RepairActivity[] {
    return dtos.map(this.toRepairActivity)
  }
}

