"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  username: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock admin user
const MOCK_ADMIN = {
  id: "admin-1",
  username: "admin",
  email: "admin@streamflix.com",
  password: "password123",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("streamflix-admin-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Protect routes
  useEffect(() => {
    if (!isLoading) {
      const isAuthRoute = pathname === "/admin/login" || pathname === "/admin/register"

      if (!user && !isAuthRoute && pathname !== "/admin") {
        router.push("/admin/login")
      } else if (user && isAuthRoute) {
        router.push("/admin/dashboard")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
      const userData = {
        id: MOCK_ADMIN.id,
        username: MOCK_ADMIN.username,
        email: MOCK_ADMIN.email,
      }

      setUser(userData)
      localStorage.setItem("streamflix-admin-user", JSON.stringify(userData))

      toast({
        title: "Login successful",
        description: "Welcome back to StreamFlix Admin",
      })

      router.push("/admin/dashboard")
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, we'll just accept any registration
    const userData = {
      id: `admin-${Date.now()}`,
      username,
      email,
    }

    setUser(userData)
    localStorage.setItem("streamflix-admin-user", JSON.stringify(userData))

    toast({
      title: "Registration successful",
      description: "Your admin account has been created",
    })

    router.push("/admin/dashboard")
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("streamflix-admin-user")
    router.push("/admin/login")

    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

