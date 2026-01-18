import type {
  IWorkspaceRepository,
  CreateWorkspaceData,
} from "../../domain/repositories/workspace-repository"
import type { Workspace } from "../../domain/entities/workspace"
import { WorkspaceDatasource } from "../datasources/workspace-datasource"
import { WorkspaceMapper } from "../mappers/workspace-mapper"

export class WorkspaceRepositoryImpl implements IWorkspaceRepository {
  private datasource = new WorkspaceDatasource()

  async getAll(): Promise<Workspace[]> {
    const dtos = await this.datasource.getAll()
    return WorkspaceMapper.toWorkspaceList(dtos ?? [])
  }

  async create(data: CreateWorkspaceData): Promise<Workspace> {
    const dto = await this.datasource.create({
      name: data.name,
      owner: {
        email: data.ownerEmail,
        password: data.ownerPassword,
      },
    })
    if (!dto) {
      throw new Error("Failed to create workspace")
    }
    const workspaceDto = (dto as any).workspace ?? dto
    return WorkspaceMapper.toWorkspace(workspaceDto)
  }
}
