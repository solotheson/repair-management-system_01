import type { Workspace, WorkspaceMember } from "../../domain/entities/workspace"
import type {
  WorkspaceDTO,
  WorkspaceMemberDTO,
} from "../dto/workspace-dto"

export class WorkspaceMapper {
  static toWorkspace(dto: WorkspaceDTO): Workspace {
    return {
      id: dto.id,
      name: dto.name,
      createdAt: dto.created_at,
      updatedAt: dto.updated_at,
    }
  }

  static toWorkspaceList(dtos: WorkspaceDTO[] | any): Workspace[] {
    let list: WorkspaceDTO[] = []

    if (Array.isArray(dtos)) {
      list = dtos
    } else if (dtos && Array.isArray(dtos.workspaces)) {
      list = dtos.workspaces
    } else if (dtos && Array.isArray(dtos.data)) {
      list = dtos.data
    }

    return list.map(this.toWorkspace)
  }

  static toWorkspaceMember(dto: WorkspaceMemberDTO): WorkspaceMember {
    return {
      id: dto.id,
      userId: dto.user.id,
      email: dto.user.email,
      firstName: dto.user.first_name,
      lastName: dto.user.last_name,
      telephoneNumber: dto.user.telephone_number,
      role: dto.role,
      status: dto.status,
      userRole: dto.user.role,
      userStatus: dto.user.status,
      joinedAt: dto.joined_at,
      createdAt: dto.created_at,
      updatedAt: dto.updated_at,
    }
  }

  static toWorkspaceMemberList(dtos: WorkspaceMemberDTO[] | any): WorkspaceMember[] {
    let list: WorkspaceMemberDTO[] = []

    if (Array.isArray(dtos)) {
      list = dtos
    } else if (dtos && Array.isArray(dtos.members)) {
      list = dtos.members
    } else if (dtos && Array.isArray(dtos.data)) {
      list = dtos.data
    }

    return list.map(this.toWorkspaceMember)
  }
}
