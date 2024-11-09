import { NextRequest,NextResponse } from "next/server";
import axios from "axios";
export async function POST(req:NextRequest) {
    const {token} = (await req.json())
    //6948~FE6f7uyH37mfmNnkuDCGtXcKGc2Gn2CRY3wXLxmHGuM7mfCV2y8xAf9kE6uEmRYW
    const URL_CLASSES =`https://canvas.instructure.com/api/v1/courses?access_token=${token}&enrollment_state=active`
    var {data} = await axios.get(URL_CLASSES)
  
    var d:any[] = []
    for (var i =0; i< data.length;i++) {
        if (d.length == 6) {
            break
        }
        if (data[i].start_at) {
            const course_year = data[i].start_at.substring(0,4)
            const course_month = data[i].start_at.substring(5,7)
            if (Number(course_year)  === 2024 && Number(course_month) >= 9) {
                d.push(data[i].name)
            } 
        }
    }
    data = d

    const URL_NAME = `https://canvas.instructure.com/api/v1/users/self?access_token=${token}`
    const name = (await axios.get(URL_NAME)).data.name
    const avatar = (await axios.get(URL_NAME)).data.avatar_url
    return NextResponse.json({classes:data, name:name,avatar:avatar})
}