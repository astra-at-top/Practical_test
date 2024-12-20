import { Outlet } from "react-router-dom"
import { Card } from "@/components/ui/card"
import Navbar from "../utils/Navbar"

export default function Template() {
  return (
    <div className="min-h-screen flex flex-col">
       <Navbar/>
        <div className="container mx-auto p-4 flex justify-center items-center flex-1">
            <Outlet />
        </div>
    </div>
  )
}
