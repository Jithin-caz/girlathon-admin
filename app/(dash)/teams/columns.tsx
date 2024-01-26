"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
    name: string
    email: string
    team: string
    memberCount: number
    idea: boolean
}

export const columns: ColumnDef<User>[] = [{
    accessorKey: "name", header: ({column}) => {
        return (<Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Leader Name
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>)
    },

}, {
    accessorKey: "email", header: ({column}) => {
        return (<Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>)
    },
}, {
    accessorKey: "team", header: ({column}) => {
        return (<Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Team Name
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>)
    },
}, {
    accessorKey: "memberCount", header: ({column}) => {
        return (<Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Member Count
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>)
    },
}, {
    accessorKey: "idea", header: ({column}) => {
        return (<Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Idea
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>)
    },
}, {
    id: "actions", header: "Edit", cell: ({row}) => {
        const user = row.original

        return (<div className="text-black bg-white">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="text-black bg-white">
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.team)}
                        >
                            Copy Team Name
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem><Link href={{pathname:"/view",query:{lead:user.email,team:user.team}}}>View full detail</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        )
    },

}]
