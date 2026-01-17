import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { RepairsState } from "../domain/entities/repair"
import type {
  CreateRepairData,
  SendRepairMessageData,
} from "../domain/repositories/repair-repository"
import { RepairRepositoryImpl } from "../data/repositories/repair-repository-impl"
import { ListRepairsUseCase } from "../domain/usecases/list-repairs-usecase"
import { CreateRepairUseCase } from "../domain/usecases/create-repair-usecase"
import { CompleteRepairUseCase } from "../domain/usecases/complete-repair-usecase"
import { SendRepairMessageUseCase } from "../domain/usecases/send-repair-message-usecase"
import { GetRepairActivityUseCase } from "../domain/usecases/get-repair-activity-usecase"

const repository = new RepairRepositoryImpl()

const listRepairsUseCase = new ListRepairsUseCase(repository)
const createRepairUseCase = new CreateRepairUseCase(repository)
const completeRepairUseCase = new CompleteRepairUseCase(repository)
const sendRepairMessageUseCase = new SendRepairMessageUseCase(repository)
const getRepairActivityUseCase = new GetRepairActivityUseCase(repository)

const initialState: RepairsState = {
  items: [],
  selectedRepairId: null,
  activityByRepairId: {},
  isLoading: false,
  isActivityLoading: false,
  error: null,
}

export const fetchRepairs = createAsyncThunk(
  "repairs/fetchAll",
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      return await listRepairsUseCase.execute(workspaceId)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const createRepair = createAsyncThunk(
  "repairs/create",
  async (
    { workspaceId, data }: { workspaceId: string; data: CreateRepairData },
    { rejectWithValue },
  ) => {
    try {
      return await createRepairUseCase.execute(workspaceId, data)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const completeRepair = createAsyncThunk(
  "repairs/complete",
  async (
    { workspaceId, repairId }: { workspaceId: string; repairId: string },
    { rejectWithValue },
  ) => {
    try {
      return await completeRepairUseCase.execute(workspaceId, repairId)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const sendRepairMessage = createAsyncThunk(
  "repairs/sendMessage",
  async (
    {
      workspaceId,
      repairId,
      data,
    }: { workspaceId: string; repairId: string; data: SendRepairMessageData },
    { rejectWithValue },
  ) => {
    try {
      return await sendRepairMessageUseCase.execute(workspaceId, repairId, data)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const fetchRepairActivity = createAsyncThunk(
  "repairs/fetchActivity",
  async (
    { workspaceId, repairId }: { workspaceId: string; repairId: string },
    { rejectWithValue },
  ) => {
    try {
      return await getRepairActivityUseCase.execute(workspaceId, repairId)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

const repairsSlice = createSlice({
  name: "repairs",
  initialState,
  reducers: {
    setSelectedRepairId: (state, action) => {
      state.selectedRepairId = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepairs.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchRepairs.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchRepairs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(createRepair.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(completeRepair.fulfilled, (state, action) => {
        const index = state.items.findIndex((repair) => repair.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(sendRepairMessage.fulfilled, (state, action) => {
        const repairId = action.payload.repairId
        const existing = state.activityByRepairId[repairId] || []
        state.activityByRepairId[repairId] = [...existing, action.payload]
      })
      .addCase(fetchRepairActivity.pending, (state) => {
        state.isActivityLoading = true
        state.error = null
      })
      .addCase(fetchRepairActivity.fulfilled, (state, action) => {
        state.isActivityLoading = false
        if (action.meta.arg.repairId) {
          state.activityByRepairId[action.meta.arg.repairId] = action.payload
        }
      })
      .addCase(fetchRepairActivity.rejected, (state, action) => {
        state.isActivityLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setSelectedRepairId, clearError } = repairsSlice.actions
export default repairsSlice.reducer

