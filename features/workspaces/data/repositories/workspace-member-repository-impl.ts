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
    return WorkspaceMapper.toWorkspaceMemberList(dtos ?? [])
  }

  async add(workspaceId: string, data: AddWorkspaceMemberData): Promise<WorkspaceMember> {
    const dto = await this.datasource.addMember(workspaceId, {
      email: data.email,
      password: data.password,
      first_name: data.firstName ?? null,
      last_name: data.lastName ?? null,
      telephone_number: data.telephoneNumber ?? null,
      role: data.role,
    })
    if (!dto) {
      throw new Error("Failed to add workspace member")
    }
    const memberDto = (dto as any).member ?? dto
    return WorkspaceMapper.toWorkspaceMember(memberDto)
  }

  async remove(workspaceId: string, memberId: string): Promise<void> {
    await this.datasource.removeMember(workspaceId, memberId)
  }
}
