"use client"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Getuser } from "@/utils/dynamoDB"
import { useUserStore } from "@/store/store"
export default function Component() {4
  const [user,setUser]=useState("")
  const{username,premium,setUserData}=useUserStore();

  const login = async()=>{
    try {
      const response=await Getuser(user)
      setUserData(response.userid,response.premium)
      
      toast.success("logged in successfully")
  } catch (error) {
    toast.error("Failed login")
  }
   }


  console.log(username,premium)
  return (
    <div className="flex items-center min-h-screen p-6 mt-[-100px]">
      <div className="w-full max-w-sm mx-auto space-y-6">
        <div className="space-y-2">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Login</CardTitle>
              <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="m@example.com" required type="email"  onChange={(e)=>{setUser(e.target.value)}} value={user}/>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link className="ml-auto inline-block text-sm underline" href="#">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" required type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={login}>Login</Button>
              <Button className="w-full" variant="outline">
                Login with Google
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="text-center text-sm">
          Don't have an account?
          <Link className="underline" href="#">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

// cFEx3BuxQ5Ywds81