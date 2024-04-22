import Form from "./form";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {SessionProvider} from "next-auth/react";

export default async function LoginPage() {
    const session = await getServerSession();
    if (session) {
        redirect('/');
    }
    return (
        <Form/>
    );
}