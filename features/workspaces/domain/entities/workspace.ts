export interface Workspace {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface WorkspaceMember {
  id: string
  workspaceId: string
  userId: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface WorkspacesState {
  items: Workspace[]
  selectedWorkspaceId: string | null
  members: WorkspaceMember[]
  isLoading: boolean
  isMembersLoading: boolean
  error: string | null
}

