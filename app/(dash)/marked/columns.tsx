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
    title: string
    category: string
    team: string
    email: string
    markdown: boolean


}

export const columns: ColumnDef<User>[] = [{
    accessorKey: "title", header: ({column}) => {
        return (<Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Title
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
    accessorKey: "category", header: ({column}) => {
        return (<Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Category
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>)
    },
}, {
    accessorKey: "markdown", header: ({column}) => {
        return (<Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Marked
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>)
    },
}, {
    id: "actions", header: "Edit", cell: ({row}) => {
        const idea = row.original

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
                            onClick={() => navigator.clipboard.writeText(idea.team)}
                        >
                            Copy Team Name
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem><Link href={{pathname:"/view",query:{lead:idea.email,team:idea.team}}}>View full detail</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        )
    },

}]
