import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { SmsState, SmsMessage } from "../domain/entities/sms-message"
import { SendSmsUseCase } from "../domain/usecases/send-sms-usecase"
import { BroadcastSmsUseCase } from "../domain/usecases/broadcast-sms-usecase"
import { SmsRepositoryImpl } from "../data/repositories/sms-repository-impl"
import type { SendSmsData, BroadcastSmsData } from "../domain/repositories/sms-repository"
import type { RootState } from "@/core/store"

const repository = new SmsRepositoryImpl()
const sendSmsUseCase = new SendSmsUseCase(repository)
const broadcastSmsUseCase = new BroadcastSmsUseCase(repository)

const initialState: SmsState = {
  messages: [],
  balance: { balance: 0, currency: "TSH" },
  isLoading: false,
  error: null,
}

export const fetchSmsBalance = createAsyncThunk("sms/fetchBalance", async (_, { rejectWithValue }) => {
  try {
    return await repository.getBalance()
  } catch (error: unknown) {
    const err = error as Error
    return rejectWithValue(err.message)
  }
})

export const sendSms = createAsyncThunk("sms/send", async (data: SendSmsData, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState
    const currentBalance = state.sms.balance.balance
    return await sendSmsUseCase.execute(data, currentBalance)
  } catch (error: unknown) {
    const err = error as Error
    return rejectWithValue(err.message)
  }
})

export const broadcastSms = createAsyncThunk(
  "sms/broadcast",
  async (data: BroadcastSmsData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const currentBalance = state.sms.balance.balance
      return await broadcastSmsUseCase.execute(data, currentBalance)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

export const fetchSmsHistory = createAsyncThunk("sms/fetchHistory", async (_, { rejectWithValue }) => {
  try {
    return await repository.getHistory()
  } catch (error: unknown) {
    const err = error as Error
    return rejectWithValue(err.message)
  }
})

export const purchaseSmsCredits = createAsyncThunk(
  "sms/purchaseCredits",
  async (amount: number, { rejectWithValue }) => {
    try {
      return await repository.purchaseCredits(amount)
    } catch (error: unknown) {
      const err = error as Error
      return rejectWithValue(err.message)
    }
  },
)

const mockMessages: SmsMessage[] = [
  {
    id: "sms1",
    recipientPhone: "+255712345678",
    recipientName: "John Doe",
    message: "Your service has been scheduled for tomorrow at 10:00 AM",
    cost: 40,
    status: "SENT",
    sentAt: "2026-01-10T09:00:00Z",
    createdAt: "2026-01-10T09:00:00Z",
  },
  {
    id: "sms2",
    recipientPhone: "+255722345678",
    recipientName: "Jane Smith",
    message: "Service completed. Thank you for choosing us!",
    cost: 40,
    status: "SENT",
    sentAt: "2026-01-09T15:00:00Z",
    createdAt: "2026-01-09T15:00:00Z",
  },
]

const smsSlice = createSlice({
  name: "sms",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setMockData: (state) => {
      state.messages = mockMessages
      state.balance = { balance: 5000, currency: "TSH" }
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance.balance = action.payload
    },
    addMessage: (state, action: PayloadAction<SmsMessage>) => {
      state.messages.unshift(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSmsBalance.fulfilled, (state, action) => {
        state.balance = action.payload
      })
      .addCase(sendSms.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(sendSms.fulfilled, (state, action) => {
        state.isLoading = false
        state.messages.unshift(action.payload)
        state.balance.balance -= 40
      })
      .addCase(sendSms.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(broadcastSms.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(broadcastSms.fulfilled, (state, action) => {
        state.isLoading = false
        state.messages = [...action.payload, ...state.messages]
        state.balance.balance -= action.payload.length * 40
      })
      .addCase(broadcastSms.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchSmsHistory.fulfilled, (state, action) => {
        state.messages = action.payload
      })
      .addCase(purchaseSmsCredits.fulfilled, (state, action) => {
        state.balance = action.payload
      })
  },
})

export const { clearError, setMockData, updateBalance, addMessage } = smsSlice.actions
export default smsSlice.reducer

