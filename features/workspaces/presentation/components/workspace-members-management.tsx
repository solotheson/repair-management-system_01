"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/core/store/hooks"
import {
  fetchWorkspaces,
  fetchWorkspaceMembers,
  addWorkspaceMember,
  setSelectedWorkspaceId,
} from "../slice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserRole } from "@/features/auth/domain/enums/user-role"
import { Loader2 } from "lucide-react"

const memberRoles = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
]

export function WorkspaceMembersManagement() {
  const dispatch = useAppDispatch()
  const { items, selectedWorkspaceId, members, isLoading, isMembersLoading, error } = useAppSelector(
    (state) => state.workspaces,
  )
  const authUser = useAppSelector((state) => state.auth.user)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [telephoneNumber, setTelephoneNumber] = useState("")
  const [role, setRole] = useState<string | undefined>("member")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const visibleMembers =
    authUser?.role === UserRole.SUPER_ADMIN ? members : members.filter((m) => m.role === "member")

  useEffect(() => {
    dispatch(fetchWorkspaces())
  }, [dispatch])

  useEffect(() => {
    if (selectedWorkspaceId) {
      dispatch(fetchWorkspaceMembers(selectedWorkspaceId))
    }
  }, [dispatch, selectedWorkspaceId])

  const handleWorkspaceChange = (workspaceId: string) => {
    dispatch(setSelectedWorkspaceId(workspaceId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedWorkspaceId) return

    try {
      await dispatch(
        addWorkspaceMember({
          workspaceId: selectedWorkspaceId,
          data: {
            email,
            password: password || undefined,
            firstName: firstName || undefined,
            lastName: lastName || undefined,
            telephoneNumber: telephoneNumber || undefined,
            role,
          },
        }),
      )
    } finally {
      await dispatch(fetchWorkspaceMembers(selectedWorkspaceId))
    }

    setEmail("")
    setPassword("")
    setFirstName("")
    setLastName("")
    setTelephoneNumber("")
    setRole("member")
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle>Workspace Members</CardTitle>
            <Button
              size="sm"
              onClick={() => setIsDialogOpen(true)}
              disabled={!selectedWorkspaceId}
            >
              Add Member
            </Button>
          </div>
          <div className="mt-4 space-y-2">
            <Label>Workspace</Label>
            <Select
              value={selectedWorkspaceId ?? ""}
              onValueChange={(value) => handleWorkspaceChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select workspace" />
              </SelectTrigger>
              <SelectContent>
                {items.map((w) => (
                  <SelectItem key={w.id} value={w.id}>
                    {w.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {!selectedWorkspaceId ? (
            <p className="text-sm text-muted-foreground">
              Select a workspace to view its members.
            </p>
          ) : isMembersLoading && visibleMembers.length === 0 ? (
            <p className="text-sm text-muted-foreground">Loading members...</p>
          ) : visibleMembers.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No members found for this workspace.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Member Role</TableHead>
                  <TableHead>User Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleMembers.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      {m.firstName} {m.lastName}
                    </TableCell>
                    <TableCell>{m.email}</TableCell>
                    <TableCell>{m.telephoneNumber ?? "-"}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{m.role}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{m.userRole}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{m.status}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{m.joinedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Workspace Member</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password (optional)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First name (optional)</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name (optional)</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telephoneNumber">Telephone number (optional)</Label>
              <Input
                id="telephoneNumber"
                value={telephoneNumber}
                onChange={(e) => setTelephoneNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {memberRoles.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={!selectedWorkspaceId || isMembersLoading || !email.trim()}
                >
                  {isMembersLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add Member
                </Button>
              </DialogFooter>
            </div>
          </form>
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </DialogContent>
      </Dialog>
    </div>
  )
}
