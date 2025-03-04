import ThemeTest1 from "./ThemTest1"


const Theme:React.FC<{}> = () => {
    return (
        <div className="bg-zinc-200 m-5 w-[calc(100vw-2.5rem)] h-[calc(100vh-2.5rem)]">
            <ThemeTest1/>   
        </div>
        
    )
}

export default Theme