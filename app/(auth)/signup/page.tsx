"use client";

import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {useForm} from "react-hook-form"


import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import axios from "axios";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import Link from "next/link";


const API = process.env.NEXT_PUBLIC_API_ROUTE

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }), password: z.string().min(2, {
        message: "Minimum password must be at least 2 characters.",
    }), cpassword: z.string().min(2, {
        message: "Minimum password must be at least 2 characters.",
    }), email: z.string().email({
        message: "Invalid email address",
    }), phone: z.string().min(10, {
        message: "Invalid phone number",
    }), username: z.string().min(2, {
        message: "Invalid username",
    })
}).refine((data) => data.password === data.cpassword, {
    message: "Password must match", path: ["cpassword"],

})
export default function Auth() {
    const router = useRouter()
    const {toast}=useToast()
    // @ts-ignore
    const form = useForm({
        resolver: zodResolver(formSchema), defaultValues: {
            name: "", password: "", cpassword: "", email: "", phone: "", username: ""

        },
    });

    const onSubmit = async (values: any) => {
        // alert(JSON.stringify(values))
        const data = {
            name: values.name,
            password: values.password,
            email: values.email,
            phone: values.phone,
            username: values.username

        }
        try {
            const res = await axios.post(`${API}/auth/register`, data)
            if (res.status === 201) {
                router.push("/dashboard")
            } else {
                toast({
                    title:"Something went wrong",
                    description:"Please try again if error persist contact"
                })
            }
        } catch (err) {
            console.log(err)
            toast({
                title:"Something went wrong",
                description:"Please try again"
            })
        }

    }
    return (<>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-1/2 bg-white  p-20 flex flex-col justify-center items-center rounded-2xl shadow-2xl"
            >
                <h2 className="text-black text-5xl font-extrabold underline-offset-2">
                    REGISTER
                </h2>
                <div className="w-full flex flex-row justify-evenly items-center">
                    <div className="w-1/2  p-5 flex flex-col justify-center items-center">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (<FormItem className="text-black text-4xl w-full">
                                <FormLabel>Userame</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="username"
                                        {...field}
                                        className="rounded-xl border-neutral-200"
                                    />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>)}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (<FormItem className="text-black text-4xl w-full">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Robert"
                                        {...field}
                                        className="rounded-xl border-neutral-200"
                                    />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>)}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (<FormItem className="text-black text-4xl w-full">
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="username@gmail.com"
                                        {...field}
                                        className="rounded-xl border-neutral-200"
                                    />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>)}
                        />

                    </div>
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({field}) => (<FormItem className="text-black text-4xl w-full">
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="9**********x"
                                        {...field}
                                        className="rounded-xl border-neutral-200"
                                    />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>)}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (<FormItem className="text-black text-4xl w-full">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="1321243"
                                        {...field}
                                        className="rounded-xl border-neutral-200"
                                    />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>)}
                        />
                        <FormField
                            control={form.control}
                            name="cpassword"
                            render={({field}) => (<FormItem className="text-black text-4xl w-full">
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="1321243"
                                        {...field}
                                        className="rounded-xl border-neutral-200"
                                    />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>)}
                        />

                    </div>
                </div>



                <Button
                    type="submit"
                    className="bg-black mt-6 hover:bg-black rounded-2xl w-1/4 text-white"
                >
                    Register
                </Button>
                <div className="w-full flex flex-row justify-evenly items-center">

                    <Link href={"/signin"} className="underline mt-6">Login</Link>
                </div>
            </form>
        </Form>
    </>);
}
