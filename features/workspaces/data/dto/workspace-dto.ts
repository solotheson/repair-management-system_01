export interface WorkspaceDTO {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface WorkspaceMemberDTO {
  id: string
  role: string
  status: string
  joined_at: string
  user: {
    id: string
    email: string
    telephone_number: string | null
    first_name: string
    last_name: string
    role: string
    status: string
  }
  created_at: string
  updated_at: string
}

export interface CreateWorkspaceRequestDTO {
  name: string
  owner: {
    email: string
    password: string
  }
}

export interface AddWorkspaceMemberRequestDTO {
  email: string
  password?: string
  first_name?: string | null
  last_name?: string | null
  telephone_number?: string | null
  role?: string
}
