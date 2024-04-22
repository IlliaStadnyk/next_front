'use client'
import { FormEvent } from "react";
import {redirect} from "next/navigation";

export default function Form(){
    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch('api/auth/register',{
            method: 'POST',
            body: JSON.stringify({
                name: formData.get('name'),
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password'),
                phone: formData.get('phone')
            }),
        });
        if (response.ok) {
            window.location.href = '/login';
        } else {
            console.error('Error:', response.statusText);
        }
        console.log(1);
    };
    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <h1>Hello Regiset</h1>
            <input name="name" className="border dorder-black text-black" placeholder="name" type="string"></input>
            <input name="username" className="border dorder-black text-black" placeholder="Username" type="string"></input>
            <input name="email" className="border dorder-black text-black" placeholder="Email" type="email"></input>
            <input name="password" className="border dorder-black text-black" placeholder="Password"
                   type="password"></input>
            <input name="phone" className="border dorder-black text-black" placeholder="phone" type="string"></input>
            <button className="border dorder-white text-white" type="submit">Register</button>
        </form>
    );
}