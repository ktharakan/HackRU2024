'use client'
import { ChangeEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"
import { ArrowRightCircleIcon,ArrowLeftCircleIcon } from "@heroicons/react/24/solid"
const Login = () => {
    const [token,setToken] = useState<string>("")
    const router = useRouter()

    const handleLogin = async(e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        signIn("credentials", {
            token,
            redirect:false
        })
        router.push("/dashboard")
    }

    return (
        <div className="grid place-items-center bg-greyBlack h-screen">
            
            <div className="flex flex-col items-center justify-center gap-8">
                <h1 className="text-2xl lg:text-6xl text-white">login</h1>
            <button onClick={()=>{router.push("/")}} className="text-white"><ArrowLeftCircleIcon className="size-12"/></button>
                <input className="text-center bg-white text-black p-2 rounded-3xl" placeholder="canvas_api_token" onChange={(e:ChangeEvent<HTMLInputElement>)=> { setToken(e.target.value)}}/>
                <button onClick={handleLogin} className="text-white"><ArrowRightCircleIcon className="size-12"/></button>
            </div>
        </div>
    )
}
export default Login