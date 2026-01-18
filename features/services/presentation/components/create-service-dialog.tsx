"use client"

import type React from "react"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/core/store/hooks"
import { createService } from "../slice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface CreateServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateServiceDialog({ open, onOpenChange }: CreateServiceDialogProps) {
  const dispatch = useAppDispatch()
  const { selectedWorkspaceId } = useAppSelector((state) => state.workspaces)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    issueDescription: "",
    message: "",
    itemType: "",
    itemBrand: "",
    itemModel: "",
    itemSerialNumber: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedWorkspaceId) return

    setIsLoading(true)

    await dispatch(
      createService({
        workspaceId: selectedWorkspaceId,
        data: {
          customer: {
            name: formData.customerName,
            telephoneNumber: formData.customerPhone,
          },
          issueDescription: formData.issueDescription,
          message: formData.message || null,
          item:
            formData.itemType ||
            formData.itemBrand ||
            formData.itemModel ||
            formData.itemSerialNumber
              ? {
                  type: formData.itemType || undefined,
                  brand: formData.itemBrand || undefined,
                  model: formData.itemModel || undefined,
                  serialNumber: formData.itemSerialNumber || undefined,
                }
              : undefined,
        },
      }),
    )

    setIsLoading(false)
    setFormData({
      customerName: "",
      customerPhone: "",
      issueDescription: "",
      message: "",
      itemType: "",
      itemBrand: "",
      itemModel: "",
      itemSerialNumber: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Service</DialogTitle>
          <DialogDescription>Register a new repair/service request for this workspace.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer name</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="Customer full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Customer phone</Label>
              <Input
                id="customerPhone"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                placeholder="0712 345 678"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueDescription">Issue description</Label>
              <Textarea
                id="issueDescription"
                value={formData.issueDescription}
                onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                placeholder="Describe the problem in detail..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Initial message (optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Message to customer or internal note..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="itemType">Item type (optional)</Label>
                <Input
                  id="itemType"
                  value={formData.itemType}
                  onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
                  placeholder="Phone, AC, Laptop..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="itemBrand">Brand (optional)</Label>
                <Input
                  id="itemBrand"
                  value={formData.itemBrand}
                  onChange={(e) => setFormData({ ...formData, itemBrand: e.target.value })}
                  placeholder="Samsung, LG..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="itemModel">Model (optional)</Label>
                <Input
                  id="itemModel"
                  value={formData.itemModel}
                  onChange={(e) => setFormData({ ...formData, itemModel: e.target.value })}
                  placeholder="Model name/number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="itemSerialNumber">Serial number (optional)</Label>
                <Input
                  id="itemSerialNumber"
                  value={formData.itemSerialNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, itemSerialNumber: e.target.value })
                  }
                  placeholder="Serial number"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Service
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
