import type {
  IWorkspaceMemberRepository,
  AddWorkspaceMemberData,
} from "../../domain/repositories/workspace-member-repository"
import type { WorkspaceMember } from "../../domain/entities/workspace"
import { WorkspaceDatasource } from "../datasources/workspace-datasource"
import { WorkspaceMapper } from "../mappers/workspace-mapper"

export class WorkspaceMemberRepositoryImpl implements IWorkspaceMemberRepository {
  private datasource = new WorkspaceDatasource()

  async list(workspaceId: string): Promise<WorkspaceMember[]> {
    const dtos = await this.datasource.listMembers(workspaceId)
    return WorkspaceMapper.toWorkspaceMemberList(dtos)
  }

  async add(workspaceId: string, data: AddWorkspaceMemberData): Promise<WorkspaceMember> {
    const dto = await this.datasource.addMember(workspaceId, {
      user_id: data.userId,
      role: data.role,
    })
    return WorkspaceMapper.toWorkspaceMember(dto)
  }

  async remove(workspaceId: string, memberId: string): Promise<void> {
    await this.datasource.removeMember(workspaceId, memberId)
  }
}

