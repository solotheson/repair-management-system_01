import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { AuthState } from "../domain/entities/user"
import { LoginUseCase } from "../domain/usecases/login-usecase"
import { RegisterUseCase } from "../domain/usecases/register-usecase"
import { BootstrapSuperadminUseCase } from "../domain/usecases/bootstrap-superadmin-usecase"
import { AuthRepositoryImpl } from "../data/repositories/auth-repository-impl"
import type { LoginCredentials, RegisterData, BootstrapData } from "../domain/repositories/auth-repository"

const authRepository = new AuthRepositoryImpl()
const loginUseCase = new LoginUseCase(authRepository)
const registerUseCase = new RegisterUseCase(authRepository)
const bootstrapSuperadminUseCase = new BootstrapSuperadminUseCase(authRepository)

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

export const login = createAsyncThunk("auth/login", async (credentials: LoginCredentials, { rejectWithValue }) => {
  try {
    const result = await loginUseCase.execute(credentials)
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", result.accessToken)
      localStorage.setItem("user", JSON.stringify(result.user))
    }
    return result
  } catch (error: unknown) {
    const err = error as Error
    return rejectWithValue(err.message || "Login failed")
  }
})

export const register = createAsyncThunk("auth/register", async (data: RegisterData, { rejectWithValue }) => {
  try {
    const result = await registerUseCase.execute(data)
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", result.accessToken)
      localStorage.setItem("user", JSON.stringify(result.user))
    }
    return result
  } catch (error: unknown) {
    const err = error as Error
    return rejectWithValue(err.message || "Registration failed")
  }
})

export const bootstrapSuperadmin = createAsyncThunk(
  "auth/bootstrapSuperadmin",
  async (data: BootstrapData, { rejectWithValue }) => {
    try {
      const result = await bootstrapSuperadminUseCase.execute(data)
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", result.accessToken)
        localStorage.setItem("user", JSON.stringify(result.user))
      }
      return result
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message || "Bootstrap failed")
    }
  },
)

export const logout = createAsyncThunk("auth/logout", async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(bootstrapSuperadmin.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(bootstrapSuperadmin.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(bootstrapSuperadmin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
  },
})

export const { clearError, setUser } = authSlice.actions
export default authSlice.reducer

