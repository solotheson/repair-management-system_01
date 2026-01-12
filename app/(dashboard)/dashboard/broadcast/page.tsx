"use client"

import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/core/store/hooks"
import { updateBalance, addMessage } from "@/features/sms/data/slice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Send } from "lucide-react"

const SMS_COST = 40

export default function BroadcastPage() {
  const dispatch = useAppDispatch()
  const { customers } = useAppSelector((state) => state.customers)
  const { balance } = useAppSelector((state) => state.sms)
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const totalCost = selectedCustomers.length * SMS_COST
  const canSend = balance.balance >= totalCost && selectedCustomers.length > 0 && message.length > 0

  const toggleCustomer = (id: string) => {
    setSelectedCustomers((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }

  const selectAll = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(customers.map((c) => c.id))
    }
  }

  const handleBroadcast = async () => {
    setSending(true)

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Add messages to history
    const selectedCustomerData = customers.filter((c) => selectedCustomers.includes(c.id))
    selectedCustomerData.forEach((customer) => {
      const newMessage = {
        id: `sms-${Date.now()}-${customer.id}`,
        recipientPhone: customer.phone,
        recipientName: customer.name,
        message,
        cost: SMS_COST,
        status: "SENT" as const,
        sentAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }
      dispatch(addMessage(newMessage))
    })

    dispatch(updateBalance(balance.balance - totalCost))

    setSending(false)
    setConfirmOpen(false)
    setSuccess(true)
    setSelectedCustomers([])
    setMessage("")

    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Broadcast Message</h1>
        <p className="text-muted-foreground">Send SMS to multiple customers at once</p>
      </div>

      {success && (
        <Alert className="bg-success/20 text-success border-success/30">
          <AlertDescription>
            Broadcast sent successfully to {selectedCustomers.length || "all selected"} customers!
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Select Recipients</CardTitle>
            <CardDescription>Choose customers to receive the broadcast message</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={selectAll}>
                  {selectedCustomers.length === customers.length ? "Deselect All" : "Select All"}
                </Button>
                <span className="text-sm text-muted-foreground">{selectedCustomers.length} selected</span>
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
                    onClick={() => toggleCustomer(customer.id)}
                  >
                    <Checkbox
                      checked={selectedCustomers.includes(customer.id)}
                      onCheckedChange={() => toggleCustomer(customer.id)}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.phone}</p>
                    </div>
                  </div>
                ))}
                {customers.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No customers available</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Compose Message</CardTitle>
            <CardDescription>Write the message to broadcast to selected customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="broadcast-message">Message</Label>
                <Textarea
                  id="broadcast-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your broadcast message..."
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="rounded-lg bg-muted p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Recipients:</span>
                  <span className="font-medium text-foreground">{selectedCustomers.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cost per SMS:</span>
                  <span className="font-medium text-foreground">{SMS_COST} TSH</span>
                </div>
                <div className="flex justify-between text-sm border-t border-border pt-2">
                  <span className="text-muted-foreground">Total Cost:</span>
                  <span className="font-bold text-foreground">{totalCost.toLocaleString()} TSH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Balance:</span>
                  <span className={`font-medium ${balance.balance >= totalCost ? "text-success" : "text-destructive"}`}>
                    {balance.balance.toLocaleString()} TSH
                  </span>
                </div>
              </div>

              {balance.balance < totalCost && selectedCustomers.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Insufficient balance. You need {(totalCost - balance.balance).toLocaleString()} TSH more.
                  </AlertDescription>
                </Alert>
              )}

              <Button className="w-full" onClick={() => setConfirmOpen(true)} disabled={!canSend}>
                <Send className="h-4 w-4 mr-2" />
                Send Broadcast
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Broadcast</DialogTitle>
            <DialogDescription>
              You are about to send a broadcast message to {selectedCustomers.length} customers. This will cost{" "}
              {totalCost.toLocaleString()} TSH.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-2">Message preview:</p>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm text-foreground">{message}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBroadcast} disabled={sending}>
              {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
