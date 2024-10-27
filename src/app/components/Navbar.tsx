'use client';
import Link from "next/link"
import { useState } from "react"
import Image from "next/image";
import {motion} from "framer-motion"
import { AnimatePresence } from "framer-motion";
import { XMarkIcon,Bars3Icon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
const menuContainer = {
    initial: {
        x:1000
    },
    animate: {
        x:0,
        transition: {
            staggerChildren:0.1,
            type:'tween',
            when:'beforeChildren',
            duration:0.5
            
        }
    },
    exit: {
        x:1000,
        transition: {
            staggerChildren:0.1,
            type:'tween',
            duration:0.5
            
        }
    }
}
const menuItem = {
    initial: {
        x:800
    },
    animate: {
        x:0,
      
    },
    
    exit: {
        x:800      
    },
    
    
}




//navbar
const Nav =() => {
    const {data:session,status} = useSession() 
    //open close 
    const [nav,setNav] = useState<boolean>(false)

    const NavComponent = ({title,link,textSize}:{title:string,link:string,textSize:string}) => {
        return (
            <Link href={link} onClick={()=>{document.body.style.overflowY="auto"}}>
                <motion.div variants={menuItem} key="menu_item" className="hover:underline border-white  flex items-center justify-center gap-2" >
                {/* <span>{number}</span> */}
                <h3 className={`${textSize}`}>{title}</h3>
                </motion.div>
            </Link>
            
        )
    }

    const SideBarComponent = ({title,link,textSize}:{title:string,link:string,textSize:string}) => {
        return (
            <Link href={link} onClick={()=>{setNav(!nav); document.body.style.overflowY="auto"}}>
                <motion.div variants={menuItem} key="menu_item" className="hover:underline border-white  flex items-center justify-center gap-2" >
                {/* <span>{number}</span> */}
                <h3 className={`${textSize}`}>{title}</h3>
                </motion.div>
            </Link>
            
        )
    }
    return (
        <div className="z-40 flex justify-between items-center  w-full bg-greyBlack fixed top-0 right-0 h-fit  drop-shadow-md p-4">
        <h1 className="text-3xl text-white">canv.ai</h1>
        <div className="hidden text-white bg-greyBlack lg:flex justify-center items-center gap-6">
        {status != "authenticated" && (<>
        <NavComponent textSize={"text-2xl"}  title={"Register"} link={"/register"}/>
        <NavComponent textSize={"text-2xl"} title={"Login"} link={"/login"}/>
        </>)}
        {(status == "authenticated") && <NavComponent textSize={"text-2xl"} title={"Dashboard"} link={"/dashboard"}/> }
        
        </div>
        <span className="block lg:hidden px-4" onClick={()=>{setNav(!nav); document.body.style.overflowY='hidden'}}><Bars3Icon className="text-white size-8"/></span>
       <AnimatePresence mode="sync">
       
       {nav ? 
        
        <motion.div 
        variants={menuContainer}
        initial="initial" 
        animate="animate" 
        exit="exit" 
        key="menu" 
        className="touch-none flex fixed top-0 right-0 flex-col justify-start items-center w-screen gap-8  h-screen bg-white text-black">
        <XMarkIcon onClick={()=> {setNav(!nav); document.body.style.overflowY='auto'}} className="size-16 text-white m-4"/>
        <SideBarComponent textSize={"text-3xl"} title={"Dashboard"} link={"/dashboard"}/>
        <SideBarComponent textSize={"text-3xl"} title={"login"} link={"/login"}/>
        <SideBarComponent textSize={"text-3xl"} title={"Register"} link={"/register"}/>
        
     
   

       
        </motion.div>
        :
        ""
    
    }

       </AnimatePresence>
       
       

        
        </div>
    )
}
export default Nav