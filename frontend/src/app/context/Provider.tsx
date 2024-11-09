'use client'
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react";
import { Session } from "next-auth";


const Provider =  ({children}: {children:ReactNode}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
export default Provider