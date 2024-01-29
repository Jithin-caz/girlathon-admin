'use client';
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {QueryClient, useMutation} from "@tanstack/react-query";

export default function Buttongroup({marked,team}:{marked:boolean,team:string}){
    const API = process.env.NEXT_PUBLIC_API_URL;
    const queryClient = new QueryClient()
    const [mark,setMark]= useState(marked)
    const {mutateAsync:markup,isLoading:mutationloading} = useMutation({
        mutationFn:async (team:string)=>{
            await fetch(`${API}/idea/mark/${team}`,{credentials: 'include'})
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ['idea'] })
        },

    })

    const {mutateAsync: deleteidea,isLoading:mutationloading2} = useMutation({
        mutationFn:async (team:string)=>{
            await fetch(`${API}/idea/delete/${team}`,{credentials: 'include'})
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ['idea'] })

        },
    })

    return(
        <>
             <div className="flex flex-row justify-center space-x-5 items-center ">
                {mark ? <Button className={"outline"} onClick={async () => {
                        try {
                            setMark(!mark);
                            markup(team)

                        } catch (e) {
                            console.log(e);
                        }
                    }}>Unmark</Button> :
                    <Button className={"outline"} onClick={async () => {
                        try {
                            setMark(!mark);
                            markup(team)
                        } catch (e) {
                            console.log(e);
                        }}}>Mark</Button>}


             </div>
        </>
    )
}