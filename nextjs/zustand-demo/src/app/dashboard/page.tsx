'use client'

import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

type DashBoardProps = {}
const DashBoard: React.FC<DashBoardProps> = () => {
    const {user, logout, isAuthenticated} = useAuthStore()
    const router = useRouter()
    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        logout()
        router.push('/')
    }
    if (!isAuthenticated()) {
        return <div>Loading...</div>
    }
    return (    
        <div>
            <h1>Welcome {user?.name}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div> 
    )
}

export default DashBoard