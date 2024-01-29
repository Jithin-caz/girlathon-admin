"use client";
import Navbar from "@/components/navbar";
import {useQuery} from "@tanstack/react-query";
import {DataTable} from "@/app/(dash)/teams/data-table";
import {columns} from "@/app/(dash)/teams/columns";
import ReactQueryProvider from "@/components/QueryClientProvider";
import axios from "axios";
import {redirect} from "next/navigation";
import {useSession} from "next-auth/react";
import {useEffect} from "react";

export default  function User(){
    const { data:session,status} = useSession()
    const API = process.env.NEXT_PUBLIC_API_URL;
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["teams"],
        queryFn: async () => {
            const res = await fetch(`${API}/user/findall`,{credentials: 'include'})
            return res.json()
        },
        staleTime: 0,

    });
    if(status === "loading")
        return <div className="flex flex-row justify-center items-center h-screen text-3xl font-extrabold">Loading ... </div>
    if(status === "unauthenticated")
        redirect('/signin')
    if(session?.role === "user" && (session?.role === "admin" || session?.role === "owner"))
        return <div className="flex flex-row justify-center items-center h-screen text-3xl font-extrabold">You are not authorized to view this page</div>
    if (isLoading)
        return <div className="flex flex-row justify-center items-center h-screen text-3xl font-extrabold">Loading ...  Go Back</div>


    return (
        <>

                <Navbar/>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-extrabold mt-1.5"> TEAMS</h1>
                </div>
                <DataTable columns={columns} data={data}/>


        </>
    )
}