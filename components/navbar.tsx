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



export default function Navbar() {
    return(
        <>
            <NavigationMenu className="w-screen bg-gray-50 mt-6 mb-4 p-2 text-xl font-bold shadow-2xl rounded-2xl  flex flex-row justify-between items-center">
                <NavigationMenuList className="w-screen flex flex-row justify-between items-center text-black">
                    <NavigationMenuList className="ml-2.5">
                        GIRLATHON 2.0
                    </NavigationMenuList>
                    <div className=" w-1/2 flex justify-evenly">
                        <NavigationMenuItem>
                            Users
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            Members
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            Ideas
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            Logout
                        </NavigationMenuItem>

                    </div>


                </NavigationMenuList>
            </NavigationMenu>

        </>
    )
}