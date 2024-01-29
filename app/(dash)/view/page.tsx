"use client";
import Navbar from "@/components/navbar";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRef} from "react";
import axios from "axios";
import {QueryClient, useMutation, useQuery} from "@tanstack/react-query";
import Idea from "@/app/(dash)/view/idea"
import Member from "@/app/(dash)/view/member";
import {redirect} from "next/navigation";
import {useSession} from "next-auth/react";

export default function View({searchParams}: { searchParams: { lead: string, team: string } }) {
    const {data:session,status} = useSession();
    const queryClient = new QueryClient()
    const API = process.env.NEXT_PUBLIC_API_URL;
    const {lead, team} = searchParams
    const password = useRef<HTMLInputElement | undefined>()
    const confirm = useRef<HTMLInputElement | undefined>()
    const reset = async () => {
        const pass = password.current?.value
        const conf = confirm.current?.value
        if (pass && conf && pass === conf) {
            const res = await axios.post(`${API}/user/admin/passwordReset`, {lead, pass}, {withCredentials: true})
            if (res.status === 201) {
                alert("Password Reset")
            } else {
                console.log(res)
                alert("Error")
            }
        } else {
            alert("Passwords do not match")
        }
    }
    const {data, isLoading, isError} = useQuery({
        queryKey: [{lead}, "alldata"], queryFn: async () => {
            const res = await fetch(`${API}/user/admin/data/${lead}`,{credentials: 'include'});
            return res.json();
        }
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
        <div className="flex flex-row justify-between items-center">
            <h1 className="text-5xl font-extrabold mt-1.5 ml-3.5"> {team &&
                <div className="bg-black text-white">{team}</div>} </h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"} className="float-right mt-3.5 rounded-2xl bg-black text-white"
                            type="button">Reset Password</Button>
                </DialogTrigger>
                <DialogContent className="w-1/3 h-1/3  bg-white text-black">
                    <DialogHeader className="font-extrabold text-4xl">
                        Reset Password
                    </DialogHeader>
                    <div>

                        <Label className="mb-1"> New Password</Label>
                        <Input className="mt-0 border-0 rounded-2xl shadow-3xl bg-gray-300 " name="receipent"
                               ref={password}/>
                        <Label className="mb-1"> Confirm New Password </Label>
                        <Input className="border-0 rounded-2xl shadow-3xl bg-gray-300 " name="msgs" ref={confirm}/>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant={"outline"}
                                        className="float-right mt-3.5 rounded-2xl bg-black text-white" type="button"
                                        onClick={reset}>Confirm</Button>
                            </DialogClose>
                        </DialogFooter>


                    </div>
                </DialogContent>
            </Dialog>
        </div>
        {isLoading ? <div className="flex flex-row justify-center items-center text-black"> Loading... </div> :
            <div className=" h-1/3 flex flex-row justify-center items-center space-x-5">
                <div
                    className="  w-1/6 p-6 flex flex-col justify-center items-center space-y-4 bg-white shadow-2xl rounded-2xl border-black border-2">
                    <h1 className="font-bold">LEAD</h1>
                    <h1>Name: {data.lead.name}</h1>
                    <h1>Email: {data.lead.email}</h1>
                    <h1>Phone: {data.lead.phone}</h1>
                </div>
                {data.members.map((member: any) => (// eslint-disable-next-line react/jsx-key
                    <Member member={member}/>
                ))}
            </div>}
        <div className="flex flex-row justify-center items-center text-4xl font-extrabold">IDEA</div>
        <div>
            <Idea team={team}/>
        </div>


    </>)
}