import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import {router} from "next/client";
import {signOut} from "next-auth/react";



export default function Navbar() {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const logout = async () => {
        signOut()
        const res = await fetch(`${API}/auth/logout`, {credentials: 'include'})
        if (res.ok) {
            await res.json()
            router.push('/signin')
        }
        else {
            await res.json()
        }
    }
    return(
        <>
            <NavigationMenu className="w-screen bg-gray-50 mt-6 mb-4 p-2 text-xl font-bold shadow-2xl rounded-2xl  flex flex-row justify-between items-center">
                <NavigationMenuList className="w-screen flex flex-row justify-between items-center text-black">
                    <NavigationMenuList className="ml-2.5">
                        GIRLATHON 2.0
                    </NavigationMenuList>
                    <div className=" w-1/2 flex justify-evenly">
                        <NavigationMenuItem>
                            <Link href={{pathname:'/teams'}}>Teams</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href={{pathname:'/marked'}}>Idea</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem onClick={()=>logout()}>
                            Logout
                        </NavigationMenuItem>

                    </div>


                </NavigationMenuList>
            </NavigationMenu>

        </>
    )
}