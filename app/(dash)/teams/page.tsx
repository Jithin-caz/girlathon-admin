"use client";
import Navbar from "@/components/navbar";
import {useQuery} from "react-query";
import {DataTable} from "@/app/(dash)/teams/data-table";
import {columns} from "@/app/(dash)/teams/columns";
import ReactQueryProvider from "@/components/QueryClientProvider";
import axios from "axios";

export default  function User(){
    const API = process.env.NEXT_PUBLIC_API_URL;
    const {data, isLoading, isError, error} = useQuery({
        queryKey: "teams",
        queryFn: async () => {
            const res = await fetch(`${API}/user/findall`)
            return res.json()
        },
        staleTime: 1000 * 60,

    })
    if (isLoading) {
        return <div className="flex flex-row justify-center items-center h-screen text-3xl font-extrabold">Loading ... </div>
    }



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