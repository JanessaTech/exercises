

const GridTest1 = () => {
    return (
        <>
        <div className="my-2">
            <div>1. How to lay item a chess by horizontal first</div>
            <div className="w-[300px] h-[100px] bg-gray-600 
                    grid grid-cols-4 grid-rows-3 
                    gap-x-1 gap-y-2">
                <div className="bg-orange-400">1</div>
                <div className="bg-orange-400">2</div>
                <div className="bg-orange-400">3</div>
                <div className="bg-orange-400">4</div>
                <div className="bg-orange-400">5</div>
                <div className="bg-orange-400">6</div>
                <div className="bg-orange-400">7</div>
                <div className="bg-orange-400">8</div>
                <div className="bg-orange-400">9</div>
            </div>
        </div>
        <div className="my-2">
            <div>2. How to lay item a chess by vertical first</div>
            <div className="w-[300px] h-[100px] bg-gray-600 
                    grid grid-cols-4 grid-rows-3 grid-flow-col
                    gap-x-1 gap-y-2">
                <div className="bg-orange-400">1</div>
                <div className="bg-orange-400">2</div>
                <div className="bg-orange-400">3</div>
                <div className="bg-orange-400">4</div>
                <div className="bg-orange-400">5</div>
                <div className="bg-orange-400">6</div>
                <div className="bg-orange-400">7</div>
                <div className="bg-orange-400">8</div>
                <div className="bg-orange-400">9</div>
            </div>
        </div>
        
        </>
    )
}

export default GridTest1