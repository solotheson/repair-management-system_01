import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { WorkspacesState } from "../domain/entities/workspace"
import type {
  CreateWorkspaceData,
} from "../domain/repositories/workspace-repository"
import type { AddWorkspaceMemberData } from "../domain/repositories/workspace-member-repository"
import { WorkspaceRepositoryImpl } from "../data/repositories/workspace-repository-impl"
import { WorkspaceMemberRepositoryImpl } from "../data/repositories/workspace-member-repository-impl"
import { GetWorkspacesUseCase } from "../domain/usecases/get-workspaces-usecase"
import { CreateWorkspaceUseCase } from "../domain/usecases/create-workspace-usecase"
import { ListWorkspaceMembersUseCase } from "../domain/usecases/list-workspace-members-usecase"
import { AddWorkspaceMemberUseCase } from "../domain/usecases/add-workspace-member-usecase"
import { RemoveWorkspaceMemberUseCase } from "../domain/usecases/remove-workspace-member-usecase"

const workspaceRepository = new WorkspaceRepositoryImpl()
const memberRepository = new WorkspaceMemberRepositoryImpl()

const getWorkspacesUseCase = new GetWorkspacesUseCase(workspaceRepository)
const createWorkspaceUseCase = new CreateWorkspaceUseCase(workspaceRepository)
const listMembersUseCase = new ListWorkspaceMembersUseCase(memberRepository)
const addMemberUseCase = new AddWorkspaceMemberUseCase(memberRepository)
const removeMemberUseCase = new RemoveWorkspaceMemberUseCase(memberRepository)

const initialState: WorkspacesState = {
  items: [],
  selectedWorkspaceId: null,
  members: [],
  isLoading: false,
  isMembersLoading: false,
  error: null,
}

export const fetchWorkspaces = createAsyncThunk("workspaces/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getWorkspacesUseCase.execute()
  } catch (error: unknown) {
    const err = error as Error
    return rejectWithValue(err.message)
  }
})

export const createWorkspace = createAsyncThunk(
  "workspaces/create",
  async (data: CreateWorkspaceData, { rejectWithValue }) => {
    try {
      return await createWorkspaceUseCase.execute(data)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const fetchWorkspaceMembers = createAsyncThunk(
  "workspaces/fetchMembers",
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      return await listMembersUseCase.execute(workspaceId)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const addWorkspaceMember = createAsyncThunk(
  "workspaces/addMember",
  async (
    { workspaceId, data }: { workspaceId: string; data: AddWorkspaceMemberData },
    { rejectWithValue },
  ) => {
    try {
      return await addMemberUseCase.execute(workspaceId, data)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const removeWorkspaceMember = createAsyncThunk(
  "workspaces/removeMember",
  async (
    { workspaceId, memberId }: { workspaceId: string; memberId: string },
    { rejectWithValue },
  ) => {
    try {
      await removeMemberUseCase.execute(workspaceId, memberId)
      return memberId
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

const workspacesSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    setSelectedWorkspaceId: (state, action) => {
      state.selectedWorkspaceId = action.payload
      state.members = []
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchWorkspaces.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(createWorkspace.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(fetchWorkspaceMembers.pending, (state) => {
        state.isMembersLoading = true
        state.error = null
      })
      .addCase(fetchWorkspaceMembers.fulfilled, (state, action) => {
        state.isMembersLoading = false
        state.members = action.payload
      })
      .addCase(fetchWorkspaceMembers.rejected, (state, action) => {
        state.isMembersLoading = false
        state.error = action.payload as string
      })
      .addCase(addWorkspaceMember.fulfilled, (state, action) => {
        state.members.push(action.payload)
      })
      .addCase(removeWorkspaceMember.fulfilled, (state, action) => {
        state.members = state.members.filter((member) => member.id !== action.payload)
      })
  },
})

export const { setSelectedWorkspaceId, clearError } = workspacesSlice.actions
export default workspacesSlice.reducer

