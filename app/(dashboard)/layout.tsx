"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/core/store/hooks"
import { setUser } from "@/features/auth/presentation/slice"
import { fetchWorkspaces } from "@/features/workspaces/presentation/slice"
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
    if (typeof window === "undefined") {
      return
    }

    const accessToken = localStorage.getItem("accessToken")

    if (!accessToken) {
      router.replace("/login")
      return
    }

    if (!isAuthenticated) {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          dispatch(setUser(parsedUser))
        } catch {
        }
      }
    }

    dispatch(fetchWorkspaces())
  }, [dispatch, isAuthenticated, router])

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
