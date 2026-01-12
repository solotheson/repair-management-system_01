import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { CustomerState, Customer } from "../domain/entities/customer"
import { CreateCustomerUseCase } from "../domain/usecases/create-customer-usecase"
import { CustomerRepositoryImpl } from "./repositories/customer-repository-impl"
import type { CreateCustomerData, UpdateCustomerData } from "../domain/repositories/customer-repository"

const repository = new CustomerRepositoryImpl()
const createCustomerUseCase = new CreateCustomerUseCase(repository)

const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
  isLoading: false,
  error: null,
}

export const fetchCustomers = createAsyncThunk("customers/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await repository.getAll()
  } catch (error: unknown) {
    const err = error as Error
    return rejectWithValue(err.message)
  }
})

export const createCustomer = createAsyncThunk(
  "customers/create",
  async (data: CreateCustomerData, { rejectWithValue }) => {
    try {
      return await createCustomerUseCase.execute(data)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, data }: { id: string; data: UpdateCustomerData }, { rejectWithValue }) => {
    try {
      return await repository.update(id, data)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const deleteCustomer = createAsyncThunk("customers/delete", async (id: string, { rejectWithValue }) => {
  try {
    await repository.delete(id)
    return id
  } catch (error: unknown) {
    const err = error as Error
    return rejectWithValue(err.message)
  }
})

// Mock customers for demo
const mockCustomers: Customer[] = [
  {
    id: "c1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+255712345678",
    address: "123 Main St, Dar es Salaam",
    createdAt: "2026-01-01T10:00:00Z",
    updatedAt: "2026-01-01T10:00:00Z",
  },
  {
    id: "c2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+255722345678",
    address: "456 Oak Ave, Arusha",
    createdAt: "2026-01-02T11:00:00Z",
    updatedAt: "2026-01-02T11:00:00Z",
  },
  {
    id: "c3",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+255732345678",
    address: "789 Pine Rd, Mwanza",
    createdAt: "2026-01-03T12:00:00Z",
    updatedAt: "2026-01-03T12:00:00Z",
  },
]

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    setMockCustomers: (state) => {
      state.customers = mockCustomers
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.isLoading = false
        state.customers = action.payload
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload)
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.customers.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.customers[index] = action.payload
        }
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter((c) => c.id !== action.payload)
      })
  },
})

export const { setSelectedCustomer, clearError, setMockCustomers } = customersSlice.actions
export default customersSlice.reducer
