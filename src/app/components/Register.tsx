'use client'
import { ChangeEventHandler, useState, useEffect } from "react"
import { ChangeEvent } from "react"
import { MouseEvent } from "react"
import {ClockLoader} from "react-spinners"
import {useRouter} from "next/navigation"
import axios, { AxiosRequestConfig } from "axios"
import toast from "react-hot-toast"
import { ArrowRightCircleIcon,ArrowLeftCircleIcon } from "@heroicons/react/24/solid"


const Register = () => {
//consts
    const router = useRouter()
    const [token,setToken] = useState<string>("")
    const [userClasses,setUserClasses] = useState<string[]>()
    const [userName,setUserName] = useState<string>()
    const [avatar,setAvatar] = useState<string>()
    const [selectedClasses,setSelectedClasses] = useState<string[]>([])

//gets all users canvas classes
    const getCanvasData = async(e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
      
        if (token) {
            try {
                const {data} = await axios.post("/api/getClasses", {token:token} )
                setUserClasses(await data.classes)
                setUserName(await data.name)
                setAvatar(await data.avatar)
               
            } catch (error) {
                console.error(error)
            }
        }  
    }
    

//adds user to data base
    const registerUser = async(e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        
        if (token && selectedClasses.length >=1) {
            try {
                const response = await axios.post("/api/register",{token:token,classes:selectedClasses,name:userName,avatar:avatar})
                if (response.status === 200) {
                    toast.success(`Registered ${userName}!`)
                    router.push("/login")
                } 
            } catch (error) {
                toast.error(userName + " is already registered!")
            }
            
            
        }else {
            toast.error("Please select at least one class!")
        }
    
    }
    const handleClassArray = (userClass:string) => {
        for (var i =0;i<selectedClasses?.length;i++) {
            if (selectedClasses[i] == userClass ) {
                return true
            }
        }
        return false
    } 


    const ClassComponent = ({userClass}:{userClass:string}) => {
        return (
            <div onClick={()=>{
                handleClassArray(userClass) ? 
                setSelectedClasses(selectedClasses.filter(c => c !=userClass))
                :
                setSelectedClasses([...selectedClasses,userClass])}} className={`${handleClassArray(userClass) ? "bg-white text-black" : ""} cursor-pointer p-4 rounded-3xl`}>
                <h1 >{userClass}</h1>
            </div>
        )
    }

   
    return (
        <div className="h-screen grid place-items-center bg-greyBlack text-white">
            {userClasses ? 
            
            
            <div className=" flex flex-col items-center justify-center gap-4">
                <button onClick={()=>{setUserClasses(undefined); setUserName(undefined);}}  className="text-white"><ArrowLeftCircleIcon className="size-12"/></button>
                {userName && <h1 className="text-3xl">{userName}</h1>}
            {userClasses && userClasses.map((userClass, index) => {
            return <ClassComponent key={index} userClass={userClass}/>; 
            })}
            <button className="place-self-center"  onClick={registerUser}><ArrowRightCircleIcon className="size-12"/></button>
            </div>
            
            
            : 
            
            <div className="w-[75%] h-[50%] flex flex-col items-center justify-center gap-8">
                 <h1 className="text-2xl lg:text-6xl">register</h1>
                 <button onClick={()=>{router.push("/")}}  className="text-white"><ArrowLeftCircleIcon className="size-12"/></button>
                <input className="text-center p-2 rounded-3xl text-black  border-white border-2 border-none" placeholder="canvas_api_token" name="token" 
                onChange={(e:ChangeEvent<HTMLInputElement>)=> {setToken(e.target.value)}}/>
                <button className="text-white  " onClick={getCanvasData}><ArrowRightCircleIcon className="size-12"/></button>
            </div>
            
            }
            
        </div>
    )
}
export default Register