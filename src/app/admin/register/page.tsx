import { RegisterForm } from "@/components/auth/register-form"
import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"

export default function Register() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Logo className="h-12 w-12" />
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your information to create an admin account</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}

