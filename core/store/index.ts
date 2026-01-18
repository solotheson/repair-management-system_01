import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/features/auth/presentation/slice"
import servicesReducer from "@/features/services/presentation/slice"
import customersReducer from "@/features/customers/presentation/slice"
import smsReducer from "@/features/sms/presentation/slice"
import usersReducer from "@/features/users/presentation/slice"
import workspacesReducer from "@/features/workspaces/presentation/slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    customers: customersReducer,
    sms: smsReducer,
    users: usersReducer,
    workspaces: workspacesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
