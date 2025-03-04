import ResponsiveDesignTest1 from "./ResponsiveDesignTest1"

const ResponsiveDesign:React.FC<{}> = () => {
    return(
        <div className="bg-zinc-200 m-5 w-[calc(100vw-2.5rem)] h-[calc(100vh-2.5rem)]">
            <ResponsiveDesignTest1/>
        </div>
    )
}

export default ResponsiveDesign