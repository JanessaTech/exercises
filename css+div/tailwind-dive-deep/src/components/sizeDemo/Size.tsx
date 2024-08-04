import SizeTest1 from "./SizeTest1"



const Size: React.FC<{}> = () => {
    return (
        <div className="bg-zinc-200 m-5 w-[calc(100vw-2.5rem)] h-[calc(100vh-2.5rem)]">
            <SizeTest1/>
        </div>
    )
}

export default Size