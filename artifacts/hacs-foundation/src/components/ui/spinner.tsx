import { cn } from "@/lib/utils"
import { LogoLoader } from "@/components/LogoLoader"

function Spinner({ className }: { className?: string }) {
  return <LogoLoader size={16} stacked={false} className={cn("inline-flex", className)} />
}

export { Spinner }
