

const GridTest1 = () => {
    return (
        <div className="grid grid-rows-6 grid-cols-5 grid-flow-col">
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
            <div className="my-2">
                <div>3. How to use col-span to spread items</div>
                <div className="w-[300px] h-[100px] bg-gray-600
                grid grid-cols-4 gap-3">
                    <div className="bg-orange-400 col-span-3">1</div>
                    <div className="bg-purple-400">2</div>
                </div>
            </div>
            <div className="my-2">
                <div>4. How to use justify-items-* in grid</div>
                <div className="w-[300px] h-[100px] bg-gray-600 
                grid grid-rows-3 grid-cols-4 justify-items-start gap-2">
                    <div className="bg-lime-600 w-[30px]">1</div>
                    <div className="bg-lime-600 w-[30px] justify-self-end">2</div>
                    <div className="bg-lime-600 w-[30px]">3</div>
                    <div className="bg-lime-600 w-[30px]">4</div>
                    <div className="bg-lime-600 w-[30px]">5</div>
                </div>
            </div>
            <div className="my-2">
                <div>5. how justify-items-start works</div>
                <div>
                    <div className="w-[316px] h-[108px] bg-red-500 absolute opacity-50 
                        grid grid-cols-3 grid-rows-2 gap-2 justify-items-start">
                        <div className="w-[50px] h-[50px] bg-black">1</div>
                        <div className="w-[50px] h-[50px] bg-black">2</div>
                        <div className="w-[50px] h-[50px] bg-black">3</div>
                        <div className="w-[50px] h-[50px] bg-black">4</div>
                        <div className="w-[50px] h-[50px] bg-black">5</div>
                        <div className="w-[50px] h-[50px] bg-black">6</div>

                    </div>
                    <div className="w-[316px] h-[108px] bg-zinc-400 
                    grid grid-cols-3 grid-rows-2 gap-2">
                        <div className="bg-zinc-300">1</div>
                        <div className="bg-zinc-300">2</div>
                        <div className="bg-zinc-300">3</div>
                        <div className="bg-zinc-300">4</div>
                        <div className="bg-zinc-300">5</div>
                        <div className="bg-zinc-300">6</div>
                    </div>
                </div>
            </div>
            <div className="my-2">
                <div>6. how justify-items-center works</div>
                <div>
                    <div className="w-[316px] h-[108px] bg-red-500 absolute opacity-50 
                        grid grid-cols-3 grid-rows-2 gap-2 justify-items-center">
                        <div className="w-[50px] h-[50px] bg-black">1</div>
                        <div className="w-[50px] h-[50px] bg-black">2</div>
                        <div className="w-[50px] h-[50px] bg-black">3</div>
                        <div className="w-[50px] h-[50px] bg-black">4</div>
                        <div className="w-[50px] h-[50px] bg-black">5</div>
                        <div className="w-[50px] h-[50px] bg-black">6</div>

                    </div>
                    <div className="w-[316px] h-[108px] bg-zinc-400 
                    grid grid-cols-3 grid-rows-2 gap-2">
                        <div className="bg-zinc-300">1</div>
                        <div className="bg-zinc-300">2</div>
                        <div className="bg-zinc-300">3</div>
                        <div className="bg-zinc-300">4</div>
                        <div className="bg-zinc-300">5</div>
                        <div className="bg-zinc-300">6</div>
                    </div>
                </div>
            </div>
            <div className="my-2">
                <div>7. how justify-items-end works</div>
                <div>
                    <div className="w-[316px] h-[108px] bg-red-500 absolute opacity-50 
                        grid grid-cols-3 grid-rows-2 gap-2 justify-items-end">
                        <div className="w-[50px] h-[50px] bg-black">1</div>
                        <div className="w-[50px] h-[50px] bg-black">2</div>
                        <div className="w-[50px] h-[50px] bg-black">3</div>
                        <div className="w-[50px] h-[50px] bg-black">4</div>
                        <div className="w-[50px] h-[50px] bg-black">5</div>
                        <div className="w-[50px] h-[50px] bg-black">6</div>

                    </div>
                    <div className="w-[316px] h-[108px] bg-zinc-400 
                    grid grid-cols-3 grid-rows-2 gap-2">
                        <div className="bg-zinc-300">1</div>
                        <div className="bg-zinc-300">2</div>
                        <div className="bg-zinc-300">3</div>
                        <div className="bg-zinc-300">4</div>
                        <div className="bg-zinc-300">5</div>
                        <div className="bg-zinc-300">6</div>
                    </div>
                </div>
            </div>
            <div className="my-2">
            <div>8. how justify-self-center works</div>
                <div>
                    <div className="w-[316px] h-[108px] bg-red-500 absolute opacity-50 
                        grid grid-cols-3 grid-rows-2 gap-2 justify-items-end">
                        <div className="w-[50px] h-[50px] bg-black">1</div>
                        <div className="w-[50px] h-[50px] bg-black justify-self-center">2</div>
                        <div className="w-[50px] h-[50px] bg-black">3</div>
                        <div className="w-[50px] h-[50px] bg-black">4</div>
                        <div className="w-[50px] h-[50px] bg-black">5</div>
                        <div className="w-[50px] h-[50px] bg-black">6</div>

                    </div>
                    <div className="w-[316px] h-[108px] bg-zinc-400 
                    grid grid-cols-3 grid-rows-2 gap-2">
                        <div className="bg-zinc-300">1</div>
                        <div className="bg-zinc-300">2</div>
                        <div className="bg-zinc-300">3</div>
                        <div className="bg-zinc-300">4</div>
                        <div className="bg-zinc-300">5</div>
                        <div className="bg-zinc-300">6</div>
                    </div>
                </div>
            </div>
            <div>
                <div>9. place-content-center cannot work well </div>
                <div className="w-[300px] h-[116px] bg-zinc-300 grid grid-cols-2 gap-4 place-content-center">
                    <div className="bg-green-500 w-[50px] h-[50px]">1</div>
                    <div className="bg-green-500 w-[50px] h-[50px]">2</div>
                    <div className="bg-green-500 w-[50px] h-[50px]">3</div>
                </div>
            </div>
        </div>
    )
}

export default GridTest1