import { JWT, Session, User } from "next-auth/next"

declare module "next-auth" {
    interface Session {
        accessToken: unknown,
        user: {
            id: string
            accessToken: string
        } & Session["user"]
    }
    interface User {
        token: string
    }
    interface JWT {
        access_token: string
    }
}