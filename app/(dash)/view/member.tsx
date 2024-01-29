"use client";
import {Button} from "@/components/ui/button";
import {QueryClient, useMutation} from "@tanstack/react-query";

export default function Member({member}:{member:any}){
    const API = process.env.NEXT_PUBLIC_API_URL;
    const queryClient = new QueryClient()
    const IdeaD = useMutation({
        mutationFn: async (email: string) => {
             const res= await fetch(`${API}/team/delete/${email}`, {credentials: 'include'})
             return res.json();
            }, onSuccess: (data, variables, context) => {
            console.log(data)
            queryClient.invalidateQueries({queryKey: ['alldata','teams']})
        },
        onSettled: (data, error, variables, context) => {
            console.log("settled")

        }
    })

    return(<>
        {!IdeaD.isSuccess &&
            <div
                className="p-4 w-1/6 flex flex-col justify-center items-center space-y-4 bg-white shadow-2xl rounded-2xl  text-black">
                <h1>Name:{member.name}</h1>
                <h1>Email:{member.email}</h1>
                <h1>Phone:{member.phone}</h1>
                <Button variant={"outline"}
                        onClick={() => IdeaD.mutateAsync(member.email)}>
                    Delete
                </Button>
            </div>
        }
    </>)

}