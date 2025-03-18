
export default function ComplexDashboardLayout({
    // four slots. slots are not route segements
    children,
    login,
    users,
    revenue,
    notifications
  }: Readonly<{
    children: React.ReactNode;
    users: React.ReactNode;
    revenue: React.ReactNode;
    notifications: React.ReactNode;
    login: React.ReactNode;
  }>) {
    const isLoggedin = false
    return isLoggedin ? (<>
        {children}  {/* children is equivalent to complex-dashboard/@children/page.tsx */ }
        <div className="flex gap-4">
            {users}
            {revenue}
            {notifications}
        </div>
        
      </> ): (<>{login}</>)
  }
  