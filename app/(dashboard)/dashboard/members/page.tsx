"use client"

import { WorkspaceMembersManagement } from "@/features/workspaces/presentation/components/workspace-members-management"

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Members</h1>
      <p className="text-sm text-muted-foreground">
        Add and manage members for each workspace.
      </p>
      <WorkspaceMembersManagement />
    </div>
  )
}

