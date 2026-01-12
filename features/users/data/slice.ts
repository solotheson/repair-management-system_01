import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { UsersState, ManagedUser } from "../domain/entities/managed-user"
import { CreateUserUseCase } from "../domain/usecases/create-user-usecase"
import { UserRepositoryImpl } from "./repositories/user-repository-impl"
import type { CreateUserData, UpdateUserData } from "../domain/repositories/user-repository"
import { UserRole } from "@/features/auth/domain/enums/user-role"

const repository = new UserRepositoryImpl()
const createUserUseCase = new CreateUserUseCase(repository)

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk("users/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await repository.getAll()
  } catch (error: unknown) {
    const err = error as Error
    return rejectWithValue(err.message)
  }
})

export const createUser = createAsyncThunk("users/create", async (data: CreateUserData, { rejectWithValue }) => {
  try {
    return await createUserUseCase.execute(data)
  } catch (error: unknown) {
    const err = error as Error
    return rejectWithValue(err.message)
  }
})

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }: { id: string; data: UpdateUserData }, { rejectWithValue }) => {
    try {
      return await repository.update(id, data)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const deleteUser = createAsyncThunk("users/delete", async (id: string, { rejectWithValue }) => {
  try {
    await repository.delete(id)
    return id
  } catch (error: unknown) {
    const err = error as Error
    return rejectWithValue(err.message)
  }
})

// Mock users for demo
const mockUsers: ManagedUser[] = [
  {
    id: "u1",
    name: "Admin User",
    email: "admin@techserve.com",
    phone: "+255700000001",
    role: UserRole.SUPER_ADMIN,
    isActive: true,
    createdAt: "2025-12-01T10:00:00Z",
    updatedAt: "2025-12-01T10:00:00Z",
  },
  {
    id: "u2",
    name: "Mike Tech",
    email: "mike@techserve.com",
    phone: "+255700000002",
    role: UserRole.MAIN_TECHNICIAN,
    isActive: true,
    createdAt: "2025-12-15T10:00:00Z",
    updatedAt: "2025-12-15T10:00:00Z",
  },
]

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    setMockUsers: (state) => {
      state.users = mockUsers
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload)
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload)
      })
  },
})

export const { setSelectedUser, clearError, setMockUsers } = usersSlice.actions
export default usersSlice.reducer
