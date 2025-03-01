import { Film } from "lucide-react"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-md bg-primary ${className}`}>
      <Film className="h-1/2 w-1/2 text-primary-foreground" />
    </div>
  )
}

