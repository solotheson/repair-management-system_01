import type {
  IRepairRepository,
  CreateRepairData,
  SendRepairMessageData,
} from "../../domain/repositories/repair-repository"
import type { Repair, RepairActivity } from "../../domain/entities/repair"
import { RepairDatasource } from "../datasources/repair-datasource"
import { RepairMapper } from "../mappers/repair-mapper"

export class RepairRepositoryImpl implements IRepairRepository {
  private datasource = new RepairDatasource()

  async list(workspaceId: string): Promise<Repair[]> {
    const dtos = await this.datasource.list(workspaceId)
    return RepairMapper.toRepairList(dtos)
  }

  async create(workspaceId: string, data: CreateRepairData): Promise<Repair> {
    const dto = await this.datasource.create(workspaceId, {
      title: data.title,
      description: data.description,
      customer_name: data.customerName,
      customer_phone: data.customerPhone,
    })
    return RepairMapper.toRepair(dto)
  }

  async complete(workspaceId: string, repairId: string): Promise<Repair> {
    const dto = await this.datasource.complete(workspaceId, repairId)
    return RepairMapper.toRepair(dto)
  }

  async sendMessage(
    workspaceId: string,
    repairId: string,
    data: SendRepairMessageData,
  ): Promise<RepairActivity> {
    const dto = await this.datasource.sendMessage(workspaceId, repairId, {
      message: data.message,
    })
    return RepairMapper.toRepairActivity(dto)
  }

  async getActivity(workspaceId: string, repairId: string): Promise<RepairActivity[]> {
    const dtos = await this.datasource.getActivity(workspaceId, repairId)
    return RepairMapper.toRepairActivityList(dtos)
  }
}

