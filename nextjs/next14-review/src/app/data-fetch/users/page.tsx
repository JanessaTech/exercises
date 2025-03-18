
type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string
}

export default async function UsersPage() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    //const res = await fetch('https://jsonplaceholder.typicode.com/users1') //simuldate error
    const users  = await res.json()
    console.log(users)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return(
        <div className="grid grid-cols-2 gap-4 p-5">
            {
                users.map((user: User) => {
                    return (
                        <div key={user.id} className="flex justify-between items-center bg-zinc-200 rounded-md p-4">
                            <div>
                                <h2 className="font-semibold">{user.name}</h2>
                                <p>{user.username}</p>
                            </div>
                            <div>
                                <div className="font-semibold">{user.email}</div>
                                <div>{user.phone}</div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}