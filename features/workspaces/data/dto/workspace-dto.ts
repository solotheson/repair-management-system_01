export interface WorkspaceDTO {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface WorkspaceMemberDTO {
  id: string
  workspace_id: string
  user_id: string
  role: string
  created_at: string
  updated_at: string
}

export interface CreateWorkspaceRequestDTO {
  name: string
}

export interface AddWorkspaceMemberRequestDTO {
  user_id: string
  role: string
}

