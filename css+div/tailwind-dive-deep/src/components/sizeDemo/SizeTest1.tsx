
const SizeTest1 = () => {
    return (
        <>
        <div className="my-2">
                    <div>1. How to spread the whole space vertically</div>
                    <div className="w-[200px] h-[50px] bg-gray-500">
                        <div className="w-1/5 h-full bg-red-400"></div>
                    </div>
                </div>
                <div className="my-2">
                    <div>2. How to fill up the remaining width of parent</div>
                    <div className="w-[200px] h-[50px] bg-gray-500 flex">
                        <div className="w-1/5 h-full bg-red-400"></div>
                        <div className="h-full bg-orange-400 grow"></div>
                    </div>
                </div>
                <div className="my-2">
                    <div>3. How to fill up the remaining height of parent</div>
                    <div>
                        <div className="w-[100px] h-[200px] bg-gray-500 flex flex-col">
                            <div className="w-full h-[50px] bg-red-500"> header</div>
                            <div className="w-full grow bg-orange-400">content</div>
                            <div className="w-full h-[20px]"></div>
                        </div>
                    </div>
                </div>
                <div className="my-2">
                    <div>4. How to fill up space horizontally with margin</div>
                    <div className="bg-gray-500 w-[200px] h-[100px]">
                        <div className="mx-4 h-full bg-amber-400">
                        </div>
                    </div>
                </div>
                <div className="my-2">
                    <div >5. How to fill up space vertically with margin(see the solution: exercises/css+div/css-basic/Margin-Top-push-outer-div-down.html)</div>
                    <div className="bg-gray-500 w-[100px] h-[200px] pt-[0.001rem]">
                        <div></div>
                        <div className="bg-red-400 w-full h-[calc(100%-2rem)] my-4"></div>
                    </div>
                </div>
        </>
    )
}

export default SizeTest1