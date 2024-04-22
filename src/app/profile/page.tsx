'use client'
import Profile from "../../../components/Profile";
import {SessionProvider, useSession} from "next-auth/react";


export default function  ProfilePage(){

    return (
        <SessionProvider>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <Profile />
            </div>
        </SessionProvider>
    )
}
