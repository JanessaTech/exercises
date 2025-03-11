const Card = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="w-60 h-40 flex justify-around items-center 
                shadow-md border-2 border-blue-600 bg-zinc-200">
            {children}
        </div>
    )
}

export default Card