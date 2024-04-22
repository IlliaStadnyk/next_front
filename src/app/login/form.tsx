'use client'
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {FormEvent} from "react";
import {getServerSession} from "next-auth";


export default function Form() {
    const router = useRouter();
    // const {data: session} = useSession();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        })
        // const session = await getServerSession();

        console.log(response);
        // console.error(session);
        if (!response?.error) {

            router.push('/');
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <h1>Hello Log in</h1>
            <input name="email" className="border dorder-black text-black" placeholder="Email" type="email"></input>
            <input name="password" className="border dorder-black text-black" placeholder="Password" type="password"></input>
            <button className="border dorder-white text-white" type="submit">Log in</button>
        </form>
    );
}