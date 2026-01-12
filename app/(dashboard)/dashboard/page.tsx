"use client"

import { useAppSelector } from "@/core/store/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceStatus } from "@/features/services/domain/enums/service-status"
import { Wrench, Users, MessageSquare, CreditCard, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const { services } = useAppSelector((state) => state.services)
  const { customers } = useAppSelector((state) => state.customers)
  const { balance, messages } = useAppSelector((state) => state.sms)

  const pendingServices = services.filter((s) => s.status === ServiceStatus.PENDING).length
  const inProgressServices = services.filter((s) => s.status === ServiceStatus.IN_PROGRESS).length
  const completedServices = services.filter((s) => s.status === ServiceStatus.COMPLETED).length

  const stats = [
    {
      title: "Total Services",
      value: services.length,
      icon: Wrench,
      color: "text-primary",
    },
    {
      title: "Pending",
      value: pendingServices,
      icon: Clock,
      color: "text-warning",
    },
    {
      title: "In Progress",
      value: inProgressServices,
      icon: AlertCircle,
      color: "text-primary",
    },
    {
      title: "Completed",
      value: completedServices,
      icon: CheckCircle,
      color: "text-success",
    },
    {
      title: "Customers",
      value: customers.length,
      icon: Users,
      color: "text-primary",
    },
    {
      title: "SMS Sent",
      value: messages.length,
      icon: MessageSquare,
      color: "text-primary",
    },
    {
      title: "SMS Balance",
      value: `${balance.balance.toLocaleString()} ${balance.currency}`,
      icon: CreditCard,
      color: "text-success",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your business.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.slice(0, 5).map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <p className="font-medium text-foreground">{service.title}</p>
                    <p className="text-sm text-muted-foreground">{service.customerName}</p>
                  </div>
                  <StatusBadge status={service.status} />
                </div>
              ))}
              {services.length === 0 && <p className="text-muted-foreground text-center py-4">No services yet</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent SMS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.slice(0, 5).map((msg) => (
                <div key={msg.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{msg.recipientName}</p>
                    <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">{msg.cost} TSH</span>
                </div>
              ))}
              {messages.length === 0 && <p className="text-muted-foreground text-center py-4">No messages yet</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    PENDING: "bg-warning/20 text-warning",
    IN_PROGRESS: "bg-primary/20 text-primary",
    COMPLETED: "bg-success/20 text-success",
    CANCELLED: "bg-destructive/20 text-destructive",
  }

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles] || "bg-muted text-muted-foreground"}`}
    >
      {status.replace("_", " ")}
    </span>
  )
}
