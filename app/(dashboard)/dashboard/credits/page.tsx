"use client"

import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/core/store/hooks"
import { updateBalance } from "@/features/sms/presentation/slice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard, CheckCircle } from "lucide-react"

const CREDIT_PACKAGES = [
  { amount: 1000, bonus: 0 },
  { amount: 5000, bonus: 250 },
  { amount: 10000, bonus: 1000 },
  { amount: 25000, bonus: 3500 },
  { amount: 50000, bonus: 10000 },
]

export default function CreditsPage() {
  const dispatch = useAppDispatch()
  const { balance } = useAppSelector((state) => state.sms)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedPackage, setSelectedPackage] = useState<(typeof CREDIT_PACKAGES)[0] | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSelectPackage = (pkg: (typeof CREDIT_PACKAGES)[0]) => {
    setSelectedPackage(pkg)
    setConfirmOpen(true)
  }

  const handleCustomPurchase = () => {
    const amount = Number.parseInt(customAmount)
    if (amount >= 100) {
      setSelectedPackage({ amount, bonus: 0 })
      setConfirmOpen(true)
    }
  }

  const handleConfirmPurchase = async () => {
    if (!selectedPackage) return

    setProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const totalCredits = selectedPackage.amount + selectedPackage.bonus
    dispatch(updateBalance(balance.balance + totalCredits))

    setProcessing(false)
    setConfirmOpen(false)
    setSuccess(true)
    setSelectedPackage(null)
    setCustomAmount("")

    setTimeout(() => setSuccess(false), 3000)
  }

  const smsCount = Math.floor(balance.balance / 40)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">SMS Credits</h1>
        <p className="text-muted-foreground">Purchase SMS credits to send messages</p>
      </div>

      {success && (
        <Alert className="bg-success/20 text-success border-success/30">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Credits purchased successfully! Your new balance has been updated.</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-foreground">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="text-4xl font-bold text-primary mb-2">{balance.balance.toLocaleString()}</div>
              <div className="text-muted-foreground">{balance.currency}</div>
              <div className="mt-4 text-sm text-muted-foreground">
                Approximately <span className="font-semibold text-foreground">{smsCount}</span> SMS messages
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground">Purchase Credits</CardTitle>
            <CardDescription>Select a package or enter a custom amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CREDIT_PACKAGES.map((pkg) => (
                <Card
                  key={pkg.amount}
                  className="border-border cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleSelectPackage(pkg)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-foreground">{pkg.amount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">TSH</div>
                    {pkg.bonus > 0 && (
                      <div className="mt-2 text-sm text-success font-medium">+{pkg.bonus.toLocaleString()} bonus</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Label className="text-foreground">Custom Amount (min 100 TSH)</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount"
                  min={100}
                />
                <Button onClick={handleCustomPurchase} disabled={!customAmount || Number.parseInt(customAmount) < 100}>
                  Purchase
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Pricing Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 rounded-lg bg-muted">
              <div className="text-sm text-muted-foreground">Cost per SMS</div>
              <div className="text-xl font-bold text-foreground">40 TSH</div>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <div className="text-sm text-muted-foreground">Minimum Purchase</div>
              <div className="text-xl font-bold text-foreground">100 TSH</div>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <div className="text-sm text-muted-foreground">Best Value</div>
              <div className="text-xl font-bold text-foreground">50,000 TSH (+20% bonus)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>You are about to purchase SMS credits.</DialogDescription>
          </DialogHeader>
          {selectedPackage && (
            <div className="py-4 space-y-4">
              <div className="rounded-lg bg-muted p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium text-foreground">{selectedPackage.amount.toLocaleString()} TSH</span>
                </div>
                {selectedPackage.bonus > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bonus:</span>
                    <span className="font-medium text-success">+{selectedPackage.bonus.toLocaleString()} TSH</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-muted-foreground">Total Credits:</span>
                  <span className="font-bold text-foreground">
                    {(selectedPackage.amount + selectedPackage.bonus).toLocaleString()} TSH
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmPurchase} disabled={processing}>
              {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <CreditCard className="h-4 w-4 mr-2" />
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
