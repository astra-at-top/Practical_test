import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/theme/ThemeContent"
import { Moon, Sun } from "lucide-react"
import { useNavigate } from "react-router-dom"


export default function Navbar() {
  const location = useLocation()
  const isLoggedIn = location.pathname === "/dashboard"
  const { isDark, setIsDark } = useTheme()
  const navigate = useNavigate()
    console.log(isDark)
  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold">
            
          </Link>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {isLoggedIn ? (
            <>
              <Button 
                variant="destructive"
                onClick={() => {
                  localStorage.removeItem("login")
                  navigate("/")
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/signup">Register</Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/">Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
