import LoginForm from "@/components/form/Login"
import { Routes ,Route } from "react-router-dom"
import Dashboard from "./components/form/Dashboard"
import Navbar from "./components/utils/Navbar"
import Signup from "./components/form/Signup"
import Template from "./components/outlet/Template"
import { ProtectedRoute, UnprotectedRoute } from "./components/utils/Authorizeroute"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Template/>}>
          <Route index element={<UnprotectedRoute><LoginForm/></UnprotectedRoute>}></Route>
          <Route path="/signup" element={<UnprotectedRoute><Signup/></UnprotectedRoute>}></Route>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
        </Route>
      </Routes>
    </>
  )
}