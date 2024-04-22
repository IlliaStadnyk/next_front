import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {NextApiRequest, NextApiResponse} from "next"


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Email and Password",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "Your Email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req) {
                try {


                    const headers = new Headers({

                        "Content-Type": "application/json",
                    })


                    const data = {
                        email: credentials?.email,
                        password: credentials?.password,
                    }
                    const options = {
                        method: "POST",
                        headers,
                        body: JSON.stringify(data),
                    }
                    try {
                        console.log("lolsl",options)
                        const response = await fetch("http://3.143.224.54/api/login", options)
                        console.log("1", response)
                        const responseData = await response.json()
                        console.log("loginBack",responseData)
                        console.log("responseData", responseData);
                        if (responseData.success == true) {
                            const responseUser = responseData.data.user
                            console.log("response", responseUser)
                            return {...responseUser, token: responseData.data.token}
                        } else {
                            console.log("HTTP error! Status:", response.status)
                            // Handle non-successful response here, return an appropriate JSON response.
                            return null
                        }
                    } catch (error) {
                        console.log("Error", error)
                    }
                }
                catch (error){
                    console.log("Error2", error)
                }


                return null
            },
        }),
    ],
    callbacks: {
        async jwt({token, account, user, profile}) {
            if (user) {
                token.user = user
                token.accessToken = user.token; // Приводим user к типу AdapterUser и обращаемся к свойству dat
            }
            console.log("token", token.accessToken)
            return token
        },
        async session({session, token}) {
            session.accessToken = token.accessToken
            session.user = token
            return session
        },
    },
}
const handler = (req: NextApiRequest, res: NextApiResponse) =>
    NextAuth(req, res, authOptions);

export const GET = handler;
export const POST = handler;