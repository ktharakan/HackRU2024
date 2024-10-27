import { NextRequest,NextResponse } from "next/server";
import axios from "axios";

export async function POST(req:NextRequest) {
    const {question} = await req.json()
    const server_ip = "http://127.0.0.1:5000/api/rag" 
    var r = null
    try {
        const response = (await axios.post(server_ip, {question:question})).data.response
        const cleanedString = response.replace(/\n/g, '');
        r = cleanedString
        console.log(r)
    } catch (error) {
        console.error(error)
    }
    
    



    return NextResponse.json({response:r})
}