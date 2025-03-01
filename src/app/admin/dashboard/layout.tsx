import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AuthProvider } from "@/components/auth-provider"

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SidebarProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </SidebarProvider>
    </>
  )
}

