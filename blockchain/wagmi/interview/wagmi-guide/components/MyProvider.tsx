'use client'

import { config } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient()

type MyProviderProps = {
    children: React.ReactNode
}
const MyProvider:React.FC<MyProviderProps> = ({children}) => {
    return (
        <WagmiProvider config={config}>
             <QueryClientProvider client={queryClient}>
                    {children}
             </QueryClientProvider>
        </WagmiProvider>
    )
}

export default MyProvider