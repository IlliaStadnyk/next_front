import { NextResponse } from "next/server";
import {json} from "node:stream/consumers";

export async function POST(request: Request) {
    try{
        console.log(2);
        const {email, password} = await request.json();
        //validation
        const dataForLogin = JSON.stringify({
            email: email,
            password: password,
        });
        console.log(dataForLogin);

        const response = await fetch('http://127.0.0.1:6000/api/login',{
            method: 'POST',
            body: dataForLogin,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json()
        console.log(data);
        return new Response('Success!', { status: 200 });
    }catch(e){
        console.log({e});
    }
}
