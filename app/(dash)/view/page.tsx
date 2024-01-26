"use client";
import Navbar from "@/components/navbar";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {TbEdit} from "react-icons/tb";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useRef} from "react";
import {useToast} from "@/components/ui/use-toast";
import axios from "axios";

export default function View({searchParams}: { searchParams: { lead:string,team:string } }) {
   const API = process.env.NEXT_PUBLIC_API_URL;
    const {lead,team} = searchParams
    const password =useRef<HTMLInputElement | undefined>()
    const confirm =useRef<HTMLInputElement | undefined>()
    const reset =async ()=>{
        const pass = password.current?.value
        const conf = confirm.current?.value
        if(pass && conf && pass === conf){
            const res = await axios.post(`${API}/user/admin/passwordReset`,{lead,pass})
            if(res.status === 201){
              alert("Password Reset")
            }else{
                console.log(res)
                alert("Error")
            }
        }else{
            alert("Passwords do not match")
        }
    }

    return (<>
        <Navbar/>
        <div className="flex flex-row justify-between items-center">
            <h1 className="text-5xl font-extrabold mt-1.5 ml-3.5"> {team && <div className="bg-black text-white">{team}</div>} </h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"} className="float-right mt-3.5 rounded-2xl bg-black text-white" type="button">Reset Password</Button>
                </DialogTrigger>
                <DialogContent className="w-1/3 h-1/3  bg-white text-black">
                    <DialogHeader className="font-extrabold text-4xl">
                        Reset Password
                    </DialogHeader>
                    <div>

                        <Label className="mb-1"> New Password</Label>
                        <Input className="mt-0 border-0 rounded-2xl shadow-3xl bg-gray-300 " name="receipent" ref={password}/>
                        <Label className="mb-1"> Confirm New Password </Label>
                        <Input className="border-0 rounded-2xl shadow-3xl bg-gray-300 " name="msgs" ref={confirm}/>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant={"outline"} className="float-right mt-3.5 rounded-2xl bg-black text-white" type="button" onClick={reset}>Confirm</Button>
                            </DialogClose>
                        </DialogFooter>



                    </div>



                </DialogContent>
            </Dialog>
        </div>

        <div className="flex flex-row justify-center items-center">

        </div>

    </>)
}