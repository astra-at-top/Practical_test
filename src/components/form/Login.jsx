import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom"

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [errors, setErrors] = useState({
    username: "",
    password: ""
  })
  const navigate = useNavigate()

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      username: "",
      password: ""
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
      isValid = false
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      const user = JSON.parse(localStorage.getItem("user") || "[]")
      console.log(user,"user")
      const filterUser = user?.filter(data => (data.username === formData.username && data.password === formData.password)) || []

      if (filterUser.length > 0) {
        localStorage.setItem("login", JSON.stringify({
          login : true,
          user : formData.username
        }))
        navigate("/dashboard")
      } else {
        if(formData.username === "admin" && formData.password === "admin"){
          localStorage.setItem("login", JSON.stringify({
            login : true,
            user : "admin"
          }))
          navigate("/dashboard")
        }else{

          setErrors({
            username: "Invalid username or password",
            password: "Invalid username or password"
          })
        }
      }


    } catch (error) {
      console.log(error,"=======")
      alert("An error occurred during login")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }))
  }

  return (
    <div className="flex items-center justify-center my-auto">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">Sign In</Button>
            <p className="text-sm text-muted-foreground text-center">
              Don't have an account? <Link to={"/signup"} className="text-primary hover:underline">Sign up</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
