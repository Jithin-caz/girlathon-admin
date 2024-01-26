"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from "axios"


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import colors from "tailwindcss/colors";
import { login } from "@/app/api/_regUser";
import {useToast} from "@/components/ui/use-toast";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_ROUTE

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Minimum password must be at least 2 characters.",
    })
})
export default function Auth(){
    console.log(API)
    const router=useRouter()
    const {toast}=useToast()

    // @ts-ignore
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",

        },
    });

    const onSubmit = async (values:any) => {
        // alert(JSON.stringify(API))

        try{
            const res= await axios.post(`${API}/auth/login`,values)
            alert(JSON.stringify("hiii"))
            // console.log(res)
            toast({
                title:"Something went wrong",
                description:"Please try again"
            })
            if (res.status===200){
                alert(JSON.stringify("hiiii"))
                router.push("/dashboard")
            }
            else if (res.status===400){
                toast({
                    title:"Invalid User Credentials",
                    description:"THe entered username or password is incorrect"
                })
            }
            else{
                toast({
                    title:"Something went wrong",
                    description:"Please try again"
                })
            }
        }
        catch(err){
            console.log(err)
            toast({
                title:"Something went wrong",
                description:"Please try again"
            })
        }


    }
    return(
        <>

            <Form {...form}  >
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 bg-white h-1/2 p-20 flex flex-col justify-center items-center rounded-2xl shadow-2xl">
                    <h2 className="text-black text-5xl font-extrabold underline-offset-2">
                        LOGIN
                    </h2>
                    <FormField
                        control={form.control}
                        name="username"

                        render={({ field }) => (
                            <FormItem className="text-black text-4xl w-1/2">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username@gmail.com"  {...field} className="rounded-xl border-neutral-200"/>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"

                        render={({ field }) => (
                            <FormItem className="text-black text-4xl w-1/2">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="1321243"  {...field} className="rounded-xl border-neutral-200"/>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button type="submit" className="bg-black mt-6 hover:bg-black rounded-2xl w-1/4 text-white">Login</Button>
                    <div className="w-full flex flex-row justify-evenly items-center">
                        <Link href={"/forgot"} className="underline mt-6">Forgot Password</Link>
                        <Link href={"/signup"} className="underline mt-6">Register User</Link>
                    </div>

                </form>

            </Form>

        </>
    )
}
