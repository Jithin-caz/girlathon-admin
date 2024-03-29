import '../globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Toaster} from "@/components/ui/toaster";
import ReactQueryProvider from "@/components/QueryClientProvider";
import Provider from "@/lib/authProvider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Create Next App', description: 'Generated by create next app',
}


export default function DashLayout({children,}: { children: any }) {
    return (<html lang="en">
    <body>

    <main className="h-screen  text-black bg-white">
        <Provider>
            <ReactQueryProvider>
                {children}
                <Toaster/>
            </ReactQueryProvider>
        </Provider>



    </main>
    </body>
    </html>)
}
