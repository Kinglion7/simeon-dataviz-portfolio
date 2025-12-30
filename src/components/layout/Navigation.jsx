import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { path: "/", label: "home page" },
  { path: "/fencing-visualization", label: "critique by design" },
  { path: "/final-project-part-one", label: "final project I" },
  { path: "/final-project-part-two", label: "final project II" },
  { path: "/final-project-part-three", label: "final project III" },
]

export default function Navigation() {
  const location = useLocation()

  return (
    <nav className="border-b bg-muted/40 sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-2 py-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Button
                key={item.path + item.label}
                asChild
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "text-sm transition-all",
                  isActive && "bg-primary text-primary-foreground shadow-sm"
                )}
              >
                <Link to={item.path}>{item.label}</Link>
              </Button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

