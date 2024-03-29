import NextAuth, {RequestInternal, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {NextApiRequest, NextApiResponse} from "next";
import {cookies} from "next/headers";
// @ts-ignore
import {parse} from "cookie";

export const Options = (req: NextApiRequest, res: NextApiResponse) => {

    // @ts-ignore
    // @ts-ignore
    return {
        providers: [CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "email", type: "email", placeholder: "jsmith"},
                password: {label: "Password", type: "password"}
            },
            authorize: async function (credentials: Record<"username" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">): Promise<User | null> {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(credentials)
                    })

                    const apiCookies = response.headers.get("Set-Cookie");
                    if (apiCookies && apiCookies.length > 0) {
                        // @ts-ignore
                        const cookie = apiCookies;
                        const parsedCookie = parse(cookie);
                        const [cookieName, cookieValue] = Object.entries(parsedCookie)[0];
                        const httpOnly = cookie.includes("httponly;");

                        // @ts-ignore
                        cookies().set({
                            name: cookieName,
                            value: cookieValue,
                            httpOnly: httpOnly,
                            maxAge: parseInt(parsedCookie["Max-Age"]),
                            path: parsedCookie.path,
                            sameSite: parsedCookie.samesite,
                            expires: new Date(parsedCookie.expires),
                            secure: true,
                        });

                    }

                    const user_ = await response.json();
                    const user = user_.user;
                    // console.log(user)
                    if (response.status === 201 && user) {

                        return user
                    } else {
                        return null;
                    }
                } catch (e) {
                    console.log(e)
                }


            },

        })], callbacks: {
            async jwt({ token, user, session}) {
                if(user){
                    return{
                        ...token,
                        user:user.user,
                        role:user.role,
                        phone:user.phone
                    }
                }
                return token;
            },
            async session({ session, token, user }) {
                if(token){
                    return{
                        ...session,
                        user:token.user,
                        role:token.role,
                        phone:token.phone
                    }
                }
                return session;
            }

        }, pages: {
            signIn: "/signin", error: "/signin",
        },
    }


};
const handler = (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, Options(req, res));
}
export {handler as GET, handler as POST}