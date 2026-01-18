import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { ServiceState, Service } from "../domain/entities/service"
import { CreateServiceUseCase } from "../domain/usecases/create-service-usecase"
import { ServiceRepositoryImpl } from "../data/repositories/service-repository-impl"
import type { CreateServiceData } from "../domain/repositories/service-repository"

const repository = new ServiceRepositoryImpl()
const createServiceUseCase = new CreateServiceUseCase(repository)

const initialState: ServiceState = {
  services: [],
  selectedService: null,
  isLoading: false,
  error: null,
}

export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      return await repository.list(workspaceId)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const createService = createAsyncThunk(
  "services/create",
  async (
    { workspaceId, data }: { workspaceId: string; data: CreateServiceData },
    { rejectWithValue },
  ) => {
    try {
      return await createServiceUseCase.execute(workspaceId, data)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const completeService = createAsyncThunk(
  "services/complete",
  async (
    {
      workspaceId,
      serviceId,
      message,
    }: { workspaceId: string; serviceId: string; message?: string | null },
    { rejectWithValue },
  ) => {
    try {
      return await repository.complete(workspaceId, serviceId, message)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setSelectedService: (state, action) => {
      state.selectedService = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false
        state.services = action.payload
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload)
      })
      .addCase(completeService.fulfilled, (state, action) => {
        const index = state.services.findIndex((s) => s.id === action.payload.id)
        if (index !== -1) {
          state.services[index] = action.payload
        }
      })
  },
})

export const { setSelectedService, clearError } = servicesSlice.actions
export default servicesSlice.reducer
