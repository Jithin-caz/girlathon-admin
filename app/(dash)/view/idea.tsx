'use client'

import {useEffect, useState} from "react";
import {QueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {router} from "next/client";
import Buttongroup from "@/app/(dash)/view/buttongroup";

export type Idea={
    title: string
    description: string
    category: string
    team: string
    markdown: boolean
    id: number
}

export default function Idea({team}: { team: string }) {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [mutate,setMutate] = useState<boolean>(false)
    const queryClient= new QueryClient()
    const {data,isLoading,isError}=useQuery({
        queryKey: [{team},'idea'],
        queryFn:async ()=>{
            const respnse=await fetch(`${API}/idea/view/${team}`,{credentials: 'include'})
            return respnse.json();
        }

    })




    if(isLoading) return <div className="flex flex-row justify-center items-center text-4xl font-extrabold">Loading</div>


    return (<>
        <div className="mx-6 my-10 h-full">
            <div className=" w-full  flex flex-row justify-evenly  space-x-3">
                <div className=" h-full w-1/3 flex flex-col justify-start  items-center space-y-4">
                    <div
                        className="h-1/4 w-full border-8 shadow-2xl rounded-2xl flex flex-col justify-center items-center p-10">
                        <div className="text-xl font-bold">TITLE</div>
                        {data.title}
                    </div>
                    <div
                        className="h-1/4 w-full border-8 shadow-2xl rounded-2xl flex flex-col justify-center items-center p-10">
                        <div className="text-xl font-bold">CATEGORY</div>
                        {data.category}
                    </div>
                </div>
                <div className="h-1/2 w-2/3 border-8 shadow-2xl rounded-2xl scroll-auto  flex flex-col justify-center items-center p-20">
                    <div className="text-xl font-bold">DESCRIPTION</div>
                    {data.description}
                </div>

            </div>
            {(isLoading || data.message) ? <div></div> : <Buttongroup marked={data.markdown} team={data.team}/>}
            </div>


    </>
)}