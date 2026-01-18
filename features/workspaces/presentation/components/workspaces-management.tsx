"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/core/store/hooks"
import { fetchWorkspaces, createWorkspace } from "../slice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"

export function WorkspacesManagement() {
  const dispatch = useAppDispatch()
  const { items, isLoading, error } = useAppSelector((state) => state.workspaces)
  const [name, setName] = useState("")
  const [ownerEmail, setOwnerEmail] = useState("")
  const [ownerPassword, setOwnerPassword] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchWorkspaces())
  }, [dispatch])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !ownerEmail.trim() || !ownerPassword.trim()) {
      return
    }
    try {
      await dispatch(
        createWorkspace({
          name,
          ownerEmail,
          ownerPassword,
        }),
      )
    } finally {
      await dispatch(fetchWorkspaces())
    }
    setName("")
    setOwnerEmail("")
    setOwnerPassword("")
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle>Workspaces</CardTitle>
            <Button size="sm" onClick={() => setIsDialogOpen(true)}>
              Add Workspace
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="w-[200px]">Workspace ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>
                    <p className="text-sm text-muted-foreground">Loading workspaces...</p>
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>
                    <p className="text-sm text-muted-foreground">No workspaces found.</p>
                  </TableCell>
                </TableRow>
              ) : (
                items.map((w) => (
                  <TableRow key={w.id}>
                    <TableCell>{w.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{w.id}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Workspace</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Workspace name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Owner email"
                type="email"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Owner password"
                type="password"
                value={ownerPassword}
                onChange={(e) => setOwnerPassword(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !name.trim() ||
                  !ownerEmail.trim() ||
                  !ownerPassword.trim()
                }
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Workspace
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
