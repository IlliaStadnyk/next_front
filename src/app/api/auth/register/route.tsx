    import { NextResponse } from "next/server";

     export async function POST(request: Request) {
        try{
            console.log(2);
            const {name, email, password,phone,username} = await request.json();
            //validation
            const data = JSON.stringify({
                name: name,
                username: username,
                email: email,
                password: password,
                phone: phone
            });
            console.log(data);

            const response = await fetch('http://3.143.224.54/api/users',{
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/ld+json'
                }
            });

            console.log(await response.json());
        }catch(e){
            console.log({e});
        }

        return NextResponse.json({message: "success"});
    }
