import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Email and Password",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "Your Email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                const res = await fetch("http://127.0.0.1:8000/api/sanctum/csrf-cookie", {
                    method: "GET",
                })

                const setCookieHeader = res.headers.get("set-cookie")
                // console.log("setCookieHeader", setCookieHeader)
                // you'll find your_site_session key in this console log
                const responseBody = await res.text();
                console.log(responseBody);

                let cookies = null
                if (setCookieHeader) {
                    cookies = setCookieHeader.split(", ")
                }
                // console.log(cookies)

                let sessionKey = null
                let xsrfToken = null

                if (cookies) {
                    for (const cookie of cookies) {
                        if (cookie.startsWith("laravel_session=")) {
                            sessionKey = cookie.split("=")[1]
                        } else if (cookie.startsWith("XSRF-TOKEN=")) {
                            xsrfToken = cookie.split("=")[1]
                        }

                        if (sessionKey && xsrfToken) {
                            break
                        }
                    }
                }
                const data = {
                    email: credentials?.email,
                    password: credentials?.password,
                }
                const headers = new Headers({
                    Cookie: `laravel_session=${sessionKey}`,
                    "Content-Type": "application/json",
                })

                if (xsrfToken) {
                    headers.append("X-XSRF-TOKEN", xsrfToken)
                }

                const options = {
                    method: "POST",
                    headers,
                    body: JSON.stringify(data),
                }
                try {
                    // console.log(options)
                    const response = await fetch("http://3.143.224.54/api/login", options)
                    const responseData = await response.json()
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
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}