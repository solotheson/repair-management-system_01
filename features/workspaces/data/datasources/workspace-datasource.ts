import { axiosInstance } from "@/core/api/axios-instance"
import type {
  WorkspaceDTO,
  WorkspaceMemberDTO,
  CreateWorkspaceRequestDTO,
  AddWorkspaceMemberRequestDTO,
} from "../dto/workspace-dto"

export class WorkspaceDatasource {
  async getAll(): Promise<WorkspaceDTO[] | null> {
    try {
      const response = await axiosInstance.get<WorkspaceDTO[]>("/v1/workspaces")
      return response.data
    } catch (error) {
      console.error("Failed to fetch workspaces", error)
      return null
    }
  }

  async create(data: CreateWorkspaceRequestDTO): Promise<WorkspaceDTO | null> {
    try {
      const response = await axiosInstance.post<WorkspaceDTO>("/admin/v1/workspaces", data)
      return response.data
    } catch (error) {
      console.error("Failed to create workspace", error)
      return null
    }
  }

  async listMembers(workspaceId: string): Promise<WorkspaceMemberDTO[] | null> {
    try {
      const response = await axiosInstance.get<WorkspaceMemberDTO[]>(
        `/v1/workspaces/${workspaceId}/members`,
      )
      return response.data
    } catch (error) {
      console.error("Failed to fetch workspace members", error)
      return null
    }
  }

  async addMember(
    workspaceId: string,
    data: AddWorkspaceMemberRequestDTO,
  ): Promise<WorkspaceMemberDTO | null> {
    try {
      const response = await axiosInstance.post<WorkspaceMemberDTO>(
        `/v1/workspaces/${workspaceId}/members`,
        data,
      )
      return response.data
    } catch (error) {
      console.error("Failed to add workspace member", error)
      return null
    }
  }

  async removeMember(workspaceId: string, memberId: string): Promise<void> {
    try {
      await axiosInstance.delete(`/v1/workspaces/${workspaceId}/members/${memberId}`)
    } catch (error) {
      console.error("Failed to remove workspace member", error)
    }
  }
}
