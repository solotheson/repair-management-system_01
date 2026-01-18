"use client"

import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "@/core/store/hooks"
import { fetchServices, completeService } from "@/features/services/presentation/slice"
import { ServiceStatus } from "@/features/services/domain/enums/service-status"
import { setSelectedWorkspaceId } from "@/features/workspaces/presentation/slice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, MoreHorizontal, MessageSquare } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateServiceDialog } from "@/features/services/presentation/components/create-service-dialog"
import { SendSmsDialog } from "@/features/sms/presentation/components/send-sms-dialog"

export default function ServicesPage() {
  const dispatch = useAppDispatch()
  const { services, isLoading } = useAppSelector((state) => state.services)
  const { selectedWorkspaceId, items: workspaces } = useAppSelector((state) => state.workspaces)
  const [search, setSearch] = useState("")
  const [createOpen, setCreateOpen] = useState(false)
  const [smsOpen, setSmsOpen] = useState(false)
  const [selectedForSms, setSelectedForSms] = useState<{ phone: string; name: string } | null>(null)

  useEffect(() => {
    if (selectedWorkspaceId) {
      dispatch(fetchServices(selectedWorkspaceId))
    }
  }, [dispatch, selectedWorkspaceId])

  const filteredServices = services.filter((service) => {
    const query = search.toLowerCase()
    const title = (service.title || "").toLowerCase()
    const customerName = (service.customerName || "").toLowerCase()
    return title.includes(query) || customerName.includes(query)
  })

  const handleComplete = (id: string) => {
    if (!selectedWorkspaceId) return
    dispatch(completeService({ workspaceId: selectedWorkspaceId, serviceId: id }))
  }

  const handleSendSms = (phone: string, name: string) => {
    setSelectedForSms({ phone, name })
    setSmsOpen(true)
  }

  const getStatusBadge = (status: ServiceStatus) => {
    const variants = {
      [ServiceStatus.PENDING]: "bg-warning/20 text-warning border-warning/30",
      [ServiceStatus.IN_PROGRESS]: "bg-primary/20 text-primary border-primary/30",
      [ServiceStatus.COMPLETED]: "bg-success/20 text-success border-success/30",
      [ServiceStatus.CANCELLED]: "bg-destructive/20 text-destructive border-destructive/30",
    }
    return (
      <Badge variant="outline" className={variants[status]}>
        {status.replace("_", " ")}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground">Manage your service requests</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <Select
            value={selectedWorkspaceId ?? ""}
            onValueChange={(value) => dispatch(setSelectedWorkspaceId(value))}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select workspace" />
            </SelectTrigger>
            <SelectContent>
              {workspaces.map((w) => (
                <SelectItem key={w.id} value={w.id}>
                  {w.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setCreateOpen(true)} disabled={!selectedWorkspaceId}>
            <Plus className="h-4 w-4 mr-2" />
            New Service
          </Button>
        </div>
      </div>

      <Card className="border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!selectedWorkspaceId ? (
            <p className="text-sm text-muted-foreground">
              Select a workspace to view its services.
            </p>
          ) : (
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Service</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{service.title}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {service.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-foreground">{service.customerName}</p>
                          <p className="text-sm text-muted-foreground">{service.customerPhone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(service.status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(service.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleSendSms(service.customerPhone, service.customerName)}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Send SMS
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {service.status !== ServiceStatus.COMPLETED && (
                              <DropdownMenuItem onClick={() => handleComplete(service.id)}>
                                Mark as completed
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredServices.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No services found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <CreateServiceDialog open={createOpen} onOpenChange={setCreateOpen} />

      {selectedForSms && (
        <SendSmsDialog
          open={smsOpen}
          onOpenChange={setSmsOpen}
          recipientPhone={selectedForSms.phone}
          recipientName={selectedForSms.name}
        />
      )}
    </div>
  )
}
