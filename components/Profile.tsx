'use client'
 import {SessionProvider, useSession} from "next-auth/react";
import {useEffect, useState} from "react";

const Profile = () => {
    const {data: session} = useSession();
    console.log("session", session?.accessToken);
    const [shown, setShow] = useState(false);
    const clickHandler =()=>{
        setShow(!shown);
    }

    return (
        <SessionProvider session={session}>
            <div className="grid grid-cols-2 text-white p-4">
                <div className="text-center">
                    <h1>
                        Hi {session?.user.name}
                    </h1>
                </div>
            <div className="text-white">
                <p className="text-black">Protected client page</p>
                <button
                    className="btn bg-blue-500 hover:bg-blue-400  p-4 "
                    onClick={clickHandler}
                >
                    Toggle
                </button>
                {shown ? (
                    <pre className="text-white">{JSON.stringify(session, null, 2)}</pre>
                ) : null}
                </div>
            </div>
        </SessionProvider>
    )
}
export default Profile