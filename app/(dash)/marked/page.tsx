"use client";
import {useQuery} from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import {DataTable} from "@/app/(dash)/marked/data-table";
import {columns} from "@/app/(dash)/marked/columns";
import {redirect} from "next/navigation";
import {useSession} from "next-auth/react";

export  default function Idea(){
    const { data:session,status} = useSession()
    const API = process.env.NEXT_PUBLIC_API_URL;
    const {data, isLoading, isError, error} = useQuery({
        queryKey: "list",
        queryFn: async () => {
            const res = await fetch(`${API}/idea/list`,{credentials: 'include'})
            return res.json()
        },
        staleTime: 1000 * 60,

    })

    if(status === "loading")
        return <div className="flex flex-row justify-center items-center h-screen text-3xl font-extrabold">Loading ... </div>
    if(status === "unauthenticated")
        redirect('/signin')
    if(session?.role === "user" && (session?.role === "admin" || session?.role === "owner"))
        return <div className="flex flex-row justify-center items-center h-screen text-3xl font-extrabold">You are not authorized to view this page</div>
    if (isLoading)
        return <div className="flex flex-row justify-center items-center h-screen text-3xl font-extrabold">Loading ...  </div>
    return (<>

        <Navbar/>
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-extrabold mt-1.5"> IDEAS</h1>
        </div>
        <DataTable columns={columns} data={data}/>
    </>)
}