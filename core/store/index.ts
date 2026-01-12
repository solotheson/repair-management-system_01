import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/features/auth/data/slice"
import servicesReducer from "@/features/services/data/slice"
import customersReducer from "@/features/customers/data/slice"
import smsReducer from "@/features/sms/data/slice"
import usersReducer from "@/features/users/data/slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    customers: customersReducer,
    sms: smsReducer,
    users: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
