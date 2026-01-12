import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { ServiceState, Service } from "../domain/entities/service"
import type { ServiceStatus } from "../domain/enums/service-status"
import { CreateServiceUseCase } from "../domain/usecases/create-service-usecase"
import { UpdateServiceStatusUseCase } from "../domain/usecases/update-service-status-usecase"
import { ServiceRepositoryImpl } from "./repositories/service-repository-impl"
import type { CreateServiceData, UpdateServiceData } from "../domain/repositories/service-repository"

const repository = new ServiceRepositoryImpl()
const createServiceUseCase = new CreateServiceUseCase(repository)
const updateStatusUseCase = new UpdateServiceStatusUseCase(repository)

const initialState: ServiceState = {
  services: [],
  selectedService: null,
  isLoading: false,
  error: null,
}

export const fetchServices = createAsyncThunk("services/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await repository.getAll()
  } catch (error: unknown) {
    const err = error as Error
    return rejectWithValue(err.message)
  }
})

export const createService = createAsyncThunk(
  "services/create",
  async (data: CreateServiceData, { rejectWithValue }) => {
    try {
      return await createServiceUseCase.execute(data)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, data }: { id: string; data: UpdateServiceData }, { rejectWithValue }) => {
    try {
      return await repository.update(id, data)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const updateServiceStatus = createAsyncThunk(
  "services/updateStatus",
  async ({ id, status }: { id: string; status: ServiceStatus }, { rejectWithValue }) => {
    try {
      return await updateStatusUseCase.execute(id, status)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const deleteService = createAsyncThunk("services/delete", async (id: string, { rejectWithValue }) => {
  try {
    await repository.delete(id)
    return id
  } catch (error: unknown) {
    const err = error as Error
    return rejectWithValue(err.message)
  }
})

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
    // Mock data for demo
    setMockServices: (state) => {
      state.services = mockServices
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
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex((s) => s.id === action.payload.id)
        if (index !== -1) {
          state.services[index] = action.payload
        }
      })
      .addCase(updateServiceStatus.fulfilled, (state, action) => {
        const index = state.services.findIndex((s) => s.id === action.payload.id)
        if (index !== -1) {
          state.services[index] = action.payload
        }
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter((s) => s.id !== action.payload)
      })
  },
})

// Mock services for demo
const mockServices: Service[] = [
  {
    id: "1",
    title: "AC Repair",
    description: "Fix broken air conditioning unit",
    status: "PENDING" as any,
    customerId: "c1",
    customerName: "John Doe",
    customerPhone: "+255712345678",
    technicianId: "t1",
    technicianName: "Mike Tech",
    scheduledAt: "2026-01-15T10:00:00Z",
    price: 150000,
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-01-10T08:00:00Z",
  },
  {
    id: "2",
    title: "Plumbing Service",
    description: "Fix leaking pipes in bathroom",
    status: "IN_PROGRESS" as any,
    customerId: "c2",
    customerName: "Jane Smith",
    customerPhone: "+255722345678",
    technicianId: "t1",
    technicianName: "Mike Tech",
    scheduledAt: "2026-01-12T14:00:00Z",
    price: 80000,
    createdAt: "2026-01-08T09:00:00Z",
    updatedAt: "2026-01-12T14:30:00Z",
  },
  {
    id: "3",
    title: "Electrical Wiring",
    description: "Install new electrical outlets",
    status: "COMPLETED" as any,
    customerId: "c3",
    customerName: "Bob Johnson",
    customerPhone: "+255732345678",
    technicianId: "t1",
    technicianName: "Mike Tech",
    scheduledAt: "2026-01-05T09:00:00Z",
    completedAt: "2026-01-05T12:00:00Z",
    price: 200000,
    createdAt: "2026-01-02T10:00:00Z",
    updatedAt: "2026-01-05T12:00:00Z",
  },
]

export const { setSelectedService, clearError, setMockServices } = servicesSlice.actions
export default servicesSlice.reducer
