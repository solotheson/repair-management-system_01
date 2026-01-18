"use client"

import { WorkspacesManagement } from "@/features/workspaces/presentation/components/workspaces-management"

export default function WorkspacesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Workspaces</h1>
      <p className="text-sm text-muted-foreground">
        Manage organizations / workspaces available in the system.
      </p>
      <WorkspacesManagement />
    </div>
  )
}

