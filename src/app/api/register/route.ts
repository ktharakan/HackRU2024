import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/app/libs/prismadb";

export async function POST(req:NextRequest) {
    const {token,classes,name,avatar} = await req.json()
   
   
   


   if(!token) {
    return new NextResponse("Missing Token", {status:400})
   }

   const exists = await prisma.user.findUnique({
    where: {token:token}
    })

    if (exists) {
        return new NextResponse("User Exists", {status:400})
    }

    const user  = await prisma.user.create({
        data:{
            token:token,
            classes:classes,
            name:name,
            avatar:avatar
        }
    })

   

   

return NextResponse.json(user)
}