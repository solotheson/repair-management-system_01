"use client"

import type React from "react"

import { useState } from "react"
import { useAppDispatch } from "@/core/store/hooks"
import { createCustomer } from "../slice"
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
import { Loader2 } from "lucide-react"

interface CreateCustomerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCustomerDialog({ open, onOpenChange }: CreateCustomerDialogProps) {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    ownerEmail: "",
    ownerPassword: "",
    ownerFirstName: "",
    ownerLastName: "",
    ownerPhone: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await dispatch(
      createCustomer({
        name: formData.name,
        email: formData.ownerEmail,
        password: formData.ownerPassword,
        firstName: formData.ownerFirstName || undefined,
        lastName: formData.ownerLastName || undefined,
        phone: formData.ownerPhone,
      }),
    )

    setIsLoading(false)
    setFormData({
      name: "",
      ownerEmail: "",
      ownerPassword: "",
      ownerFirstName: "",
      ownerLastName: "",
      ownerPhone: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>Add a new customer to your database.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workspace / Organization Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerEmail">Owner Email</Label>
              <Input
                id="ownerEmail"
                type="email"
                value={formData.ownerEmail}
                onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                placeholder="owner@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerPassword">Owner Password</Label>
              <Input
                id="ownerPassword"
                type="password"
                value={formData.ownerPassword}
                onChange={(e) => setFormData({ ...formData, ownerPassword: e.target.value })}
                placeholder="Min 6 characters"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ownerFirstName">Owner First Name (optional)</Label>
                <Input
                  id="ownerFirstName"
                  value={formData.ownerFirstName}
                  onChange={(e) => setFormData({ ...formData, ownerFirstName: e.target.value })}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerLastName">Owner Last Name (optional)</Label>
                <Input
                  id="ownerLastName"
                  value={formData.ownerLastName}
                  onChange={(e) => setFormData({ ...formData, ownerLastName: e.target.value })}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerPhone">Owner Phone (optional)</Label>
              <Input
                id="ownerPhone"
                type="tel"
                value={formData.ownerPhone}
                onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                placeholder="+255712345678"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Customer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
