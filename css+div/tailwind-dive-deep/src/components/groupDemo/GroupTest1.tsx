

const GroupTest1 = () => {
    return (
        <div className="grid grid-cols-4 grid-rows-4 grid-flow-col gap-5">
            <div className="my-2">
                <div>Without group in parent</div>
                <div className="w-full h-40 bg-red-400 relative">
                    <div className="absolute bottom-0 right-0 w-10 h-16 bg-green-400 cursor-pointer hover:bg-purple-500"></div>
                </div>
            </div>
            <div className="my-2">
                <div>With group in parent</div>
                <div className="w-full h-40 bg-red-400 relative group">
                    <div className="absolute bottom-0 right-0 w-10 h-16 bg-green-400 cursor-pointer group-hover:bg-purple-500"></div>
                </div>
            </div>
            <div className="my-2">
                <div>Nested group</div>
                <div className="w-full h-40 bg-red-400 relative group">
                    <span className="absolute right-0">parent1</span>
                    <div className="absolute bottom-0 right-0 w-10 h-16 bg-green-400 cursor-pointer group-hover:bg-purple-500"></div>
                    <div className="group/nested w-1/4 h-20 relative border-[2px] border-white">
                        <span>parent2</span>
                        <div className="w-10 h-10 bg-zinc-600 group-hover/nested:bg-cyan-400 absolute bottom-0"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupTest1