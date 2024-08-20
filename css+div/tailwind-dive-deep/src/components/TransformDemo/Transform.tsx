const Transform: React.FC<{}> = () => {
    return (
        <div className="bg-zinc-200 m-5 w-[calc(100vw-2.5rem)] h-[calc(100vh-2.5rem)]">
            <div className="w-fit border border-red-400 m-3">
                    <div>1. scale x 50%</div>
                    <div>
                        <div>Before</div>
                        <div className="w-20 h-5 bg-green-500"></div>
                    </div>
                    <div>
                        <div>After</div>
                        <div className="w-20 h-5 bg-green-500 scale-x-50"></div>
                    </div>
            </div>
            <div className="border border-red-500 w-fit">
                <div>2. rotate 45deg in clock-wise</div>
                <div className="my-10">
                    
                    <div className="w-[100px] h-[20px] bg-green-500 absolute"></div>
                    <div className="w-[100px] h-[20px] bg-red-500 rotate-45"></div>
                </div>
            </div>
            

            
        </div>
    )
}

export default Transform