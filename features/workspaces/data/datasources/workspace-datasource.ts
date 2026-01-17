import { axiosInstance } from "@/core/api/axios-instance"
import type {
  WorkspaceDTO,
  WorkspaceMemberDTO,
  CreateWorkspaceRequestDTO,
  AddWorkspaceMemberRequestDTO,
} from "../dto/workspace-dto"

export class WorkspaceDatasource {
  async getAll(): Promise<WorkspaceDTO[]> {
    const response = await axiosInstance.get<WorkspaceDTO[]>("/v1/workspaces")
    return response.data
  }

  async create(data: CreateWorkspaceRequestDTO): Promise<WorkspaceDTO> {
    const response = await axiosInstance.post<WorkspaceDTO>("/admin/v1/workspaces", data)
    return response.data
  }

  async listMembers(workspaceId: string): Promise<WorkspaceMemberDTO[]> {
    const response = await axiosInstance.get<WorkspaceMemberDTO[]>(
      `/v1/workspaces/${workspaceId}/members`,
    )
    return response.data
  }

  async addMember(
    workspaceId: string,
    data: AddWorkspaceMemberRequestDTO,
  ): Promise<WorkspaceMemberDTO> {
    const response = await axiosInstance.post<WorkspaceMemberDTO>(
      `/v1/workspaces/${workspaceId}/members`,
      data,
    )
    return response.data
  }

  async removeMember(workspaceId: string, memberId: string): Promise<void> {
    await axiosInstance.delete(`/v1/workspaces/${workspaceId}/members/${memberId}`)
  }
}

