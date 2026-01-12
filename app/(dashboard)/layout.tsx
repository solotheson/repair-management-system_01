"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/core/store/hooks"
import { setUser } from "@/features/auth/data/slice"
import { setMockServices } from "@/features/services/data/slice"
import { setMockCustomers } from "@/features/customers/data/slice"
import { setMockData as setMockSmsData } from "@/features/sms/data/slice"
import { setMockUsers } from "@/features/users/data/slice"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { UserRole } from "@/features/auth/domain/enums/user-role"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    // For demo, set mock user if not authenticated
    if (!isAuthenticated) {
      dispatch(
        setUser({
          id: "u1",
          email: "admin@techserve.com",
          name: "Admin User",
          role: UserRole.SUPER_ADMIN,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      )
    }
    // Load mock data
    dispatch(setMockServices())
    dispatch(setMockCustomers())
    dispatch(setMockSmsData())
    dispatch(setMockUsers())
  }, [dispatch, isAuthenticated])

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardHeader />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
