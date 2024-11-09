'use client'
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const Hero = () => {
const router = useRouter()
const {data:session,status} = useSession()
useEffect(()=> {
    if (session) {
        router.push("/dashboard")
    }
    
},[session])
    return (
        <div className="h-screen bg-greyBlack text-white grid place-items-center">
            <h1 className="text-7xl">canv.ai</h1>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
            <button onClick={()=>{router.push("/register")}} className="rounded-3xl w-[50%] bg-white text-greyBlack p-4">
            Register
            </button>
            <button onClick={()=> {router.push("/login")}} className="rounded-3xl w-[50%] bg-white text-greyBlack p-4">
            Login
            </button>
            </div>
        </div>
    )
}

export default Hero