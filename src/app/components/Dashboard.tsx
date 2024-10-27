"use client"
import { EyeIcon, ArrowUpIcon } from "@heroicons/react/24/solid"
import { useSession } from "next-auth/react"
import { useState ,useRef, MutableRefObject, useEffect} from "react"
import Image from "next/image"
import toast from "react-hot-toast"
import axios from "axios"


const Dashboard = () => {
    const {data:session,status} = useSession() 
    const [str,setStr] = useState<string[]>([])
    const [isVisible,setIsVisible] = useState<boolean>(false)
    const textAreaRef:MutableRefObject<HTMLTextAreaElement | null> = useRef(null);


   
    
    const ChatBox = () => {
        return (
            <div className="px-4">
            {str.map((s,key)=> {
                return <ChatBubble s={s}  key={key} right={key % 2 ==0 ? true : false}/>
            })}
            </div>
        )
    }

    const ChatBubble = ({right,s}:{right:boolean,s:string}) => {
        return (
            <div className={` flex items-center rounded-3xl ${right ? "text-right justify-end" : "text-left justify-items-start"} w-full bg-greyBlack  text-black`}>
                <h1 className="bg-white px-4 py-2   rounded-3xl text-black max-w-[50%]">
                {s}
                </h1>
                
            </div>
        )
    }

    // const getCanvasData = async(e:MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault()
      
    //     if (token) {
    //         try {
    //             const {data} = await axios.post("/api/getClasses", {token:token} )
    //             setUserClasses(await data.classes)
    //             setUserName(await data.name)
               
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }  
    // }
    


    const handleGetResponse = async(question:string)=> {
            try {
                const loadingToastId = toast.loading("generating a response...");
                const response = (await axios.post("/api/handleRAG", {question:question})).data.response
                toast.success("got response!")
                toast.dismiss(loadingToastId)
                if (response) {
                    setStr(str => [...str,response])
                    setIsVisible(!isVisible)
                }else {
                    console.log("something went wrong")
                }
                
              
            } catch (error) {
                console.error(error)
            }
    }


    const handleSubmitQuestion = (e:React.MouseEvent<HTMLButtonElement>)=> {
       
        e.preventDefault()

        if (textAreaRef.current) {
            setIsVisible(!isVisible)
            const question = textAreaRef.current.value
            setStr(str =>[...str,question])

            handleGetResponse(question)
            
            setIsVisible(!isVisible)
        }
        
    }

    return (
        <>
        {session && 
      
        <div className={`lg:h-[43rem]  bg-greyBlack grid grid-rows-2 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 mt-20 overflow-hidden`}>
           <div className="flex flex-col items-center justify-around">
           <h1 className="text-2xl lg:text-4xl text-white">{session.user.name}</h1>
            
           <div className="size-24 object-contain rounded-full overflow-hidden">
            <Image width={100} height={100} className="size-full" alt="user avatar" src={session.user.avatar}/>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                {session.user.classes.map((c,index) => {
                    return (
                        <div key={index} className="bg-white rounded-2xl p-4 text-black">
                            <h1 >{c}</h1>
                        </div>
                    )
                })}
            </div>
           </div>
            
            
         
            
            <div className="grid grid-rows-6 grid-cols-1">
            <div className="row-start-1 row-end-2 flex items-center gap-2 justify-center">
            
            <span> <EyeIcon className="size-12 text-white"/></span>
            </div>

            <div className="row-start-2 row-end-6 rounded-3xl overflow-y-scroll">
               <ChatBox/>
            </div>

            <div className="grid grid-cols-1 grid-rows-1 p-4">
                <textarea ref={textAreaRef} className="col-start-1 col-end-2 row-start-1 row-end-2 bg-transparent size-full p-2 text-white outline-none" placeholder="ask your questions!"/>
                <button onClick={(e) =>{handleSubmitQuestion(e)}} className="z-10 self-center col-start-1 col-end-2 row-start-1 row-end-2 text-black place-self-end bg-white rounded-2xl p-2">
                    <ArrowUpIcon className="size-8 text-greyBlack"/>
                </button>
            </div>
            
            </div>

          
        </div>
        
        }
        </>
    )
}

export default Dashboard