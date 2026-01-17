"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/core/store/hooks"
import { addMessage, updateBalance } from "../slice"
import { Button } from "@/components/ui/button"
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"

interface SendSmsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipientPhone: string
  recipientName: string
  defaultMessage?: string
}

const SMS_COST = 40

export function SendSmsDialog({
  open,
  onOpenChange,
  recipientPhone,
  recipientName,
  defaultMessage = "Hello! Your service has been scheduled. We will contact you soon. Thank you for choosing TechServe Pro!",
}: SendSmsDialogProps) {
  const dispatch = useAppDispatch()
  const { balance, isLoading } = useAppSelector((state) => state.sms)
  const [message, setMessage] = useState(defaultMessage)
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  const canSend = balance.balance >= SMS_COST

  const handleSend = async () => {
    if (!canSend) {
      setError(`Insufficient balance. Need ${SMS_COST} TSH, have ${balance.balance} TSH`)
      return
    }

    setSending(true)
    setError(null)

    // Simulate sending SMS
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newMessage = {
      id: `sms-${Date.now()}`,
      recipientPhone,
      recipientName,
      message,
      cost: SMS_COST,
      status: "SENT" as const,
      sentAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    dispatch(addMessage(newMessage))
    dispatch(updateBalance(balance.balance - SMS_COST))

    setSending(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send SMS</DialogTitle>
          <DialogDescription>
            Send an SMS to {recipientName} ({recipientPhone})
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!canSend && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Insufficient SMS balance. Please purchase credits to send messages.</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-sm text-muted-foreground">
              Cost: {SMS_COST} TSH | Balance: {balance.balance} TSH
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={!canSend || sending}>
            {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send SMS
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
