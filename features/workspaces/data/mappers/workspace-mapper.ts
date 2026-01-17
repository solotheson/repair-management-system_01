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

  static toWorkspaceList(dtos: WorkspaceDTO[]): Workspace[] {
    return dtos.map(this.toWorkspace)
  }

  static toWorkspaceMember(dto: WorkspaceMemberDTO): WorkspaceMember {
    return {
      id: dto.id,
      workspaceId: dto.workspace_id,
      userId: dto.user_id,
      role: dto.role,
      createdAt: dto.created_at,
      updatedAt: dto.updated_at,
    }
  }

  static toWorkspaceMemberList(dtos: WorkspaceMemberDTO[]): WorkspaceMember[] {
    return dtos.map(this.toWorkspaceMember)
  }
}

