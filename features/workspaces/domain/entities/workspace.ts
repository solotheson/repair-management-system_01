export interface Workspace {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface WorkspaceMember {
  id: string
  userId: string
  email: string
  firstName: string
  lastName: string
  telephoneNumber: string | null
  role: string
  status: string
  userRole: string
  userStatus: string
  joinedAt: string
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
