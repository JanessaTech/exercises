
const FlexTest1 = () => {
    return (
        <div className="grid grid-cols-5 grid-rows-4 gap-2 grid-flow-col">
            <div>
                <div>1. How to use basis</div>
                <div className="w-full h-40 bg-green-300 flex">
                    <div className="basis-1/4 bg-purple-200 h-10">1</div>
                    <div className="basis-1/4 bg-purple-400 h-10">2</div>
                    <div className="basis-1/2 bg-purple-600 h-10">3</div>
                </div>
            </div>
            <div>
                <div>2. How to use basis + flex-col</div>
                <div className="w-full h-40 bg-green-300 flex flex-col">
                    <div className="basis-1/4 bg-purple-200 w-10">1</div>
                    <div className="basis-1/4 bg-purple-400 w-20">2</div>
                    <div className="basis-1/2 bg-purple-600 w-40">3</div>
                </div>
            </div>
            <div>
                <div>3. How to use flex-wrap</div>
                <div className="w-full h-40 bg-green-300 flex flex-wrap">
                    <div className="w-32 bg-purple-200 h-10">1</div>
                    <div className="w-32 bg-purple-400 h-10">2</div>
                    <div className="w-32 bg-purple-600 h-10">3</div>
                    <div className="w-32 bg-purple-200 h-10">4</div>
                    <div className="w-32 bg-purple-400 h-10">5</div>
                    <div className="w-32 bg-purple-600 h-10">6</div>
                </div>
            </div>
            <div>
                <div>4. How to use flex-1</div>
                <div className="w-full h-40 bg-green-300 flex">
                    <div className="w-10 bg-purple-200 h-10">1</div>
                    <div className="flex-1 w-10 bg-purple-400 h-10">2</div>
                    <div className="w-10 bg-purple-600 h-10">3</div>
                </div>
            </div>
            <div>
                <div>5. How to use grow</div>
                <div className="w-full h-40 bg-green-300 flex">
                    <div className="w-10 bg-purple-200 h-10">1</div>
                    <div className="grow w-10 bg-purple-400 h-10">2</div>
                    <div className="w-10 bg-purple-600 h-10">3</div>
                </div>
            </div>
            <div>
                <div>6. How to use grow-0</div>
                <div className="w-full h-40 bg-green-300 flex">
                    <div className="w-10 bg-purple-200 h-10">1</div>
                    <div className="grow-0 w-10 bg-purple-400 h-10">2</div>
                    <div className="w-10 bg-purple-600 h-10">3</div>
                </div>
            </div>
            <div>
                <div>7. How to use shrink and shrink-0</div>
                <div className="w-full h-40 bg-green-300 flex">
                    <div className="w-1/3 shrink-0 bg-purple-200 h-10">1</div>
                    <div className="shrink w-full bg-purple-400 h-10">2</div>
                    <div className="shrink-0 w-1/3 bg-purple-600 h-10">3</div>
                </div>
            </div>
            <div>
                <div>8. how to use Justify Content- justify-start</div>
                <div className="w-full h-40 bg-green-300 flex gap-4 justify-start flex-wrap">
                    <div className="bg-purple-200 h-10 w-10">1</div>
                    <div className="bg-purple-200 h-10 w-10">2</div>
                    <div className="bg-purple-200 h-10 w-10">3</div>
                    <div className="bg-purple-200 h-10 w-10">4</div>
                    <div className="bg-purple-200 h-10 w-10">5</div>
                    <div className="bg-purple-200 h-10 w-10">6</div>
                    <div className="bg-purple-200 h-10 w-10">7</div>
                    <div className="bg-purple-200 h-10 w-10">8</div>
                    <div className="bg-purple-200 h-10 w-10">9</div>
                </div>
            </div>
            <div>
                <div>9. how to use Justify Content- justify-center</div>
                <div className="w-full h-40 bg-green-300 flex gap-4 justify-center flex-wrap">
                    <div className="bg-purple-200 h-10 w-10">1</div>
                    <div className="bg-purple-200 h-10 w-10">2</div>
                    <div className="bg-purple-200 h-10 w-10">3</div>
                    <div className="bg-purple-200 h-10 w-10">4</div>
                    <div className="bg-purple-200 h-10 w-10">5</div>
                    <div className="bg-purple-200 h-10 w-10">6</div>
                    <div className="bg-purple-200 h-10 w-10">7</div>
                    <div className="bg-purple-200 h-10 w-10">8</div>
                    <div className="bg-purple-200 h-10 w-10">9</div>
                </div>
            </div>
            <div>
                <div>10. how to use Justify Content- justify-end</div>
                <div className="w-full h-40 bg-green-300 flex gap-4 justify-end flex-wrap">
                    <div className="bg-purple-200 h-10 w-10">1</div>
                    <div className="bg-purple-200 h-10 w-10">2</div>
                    <div className="bg-purple-200 h-10 w-10">3</div>
                    <div className="bg-purple-200 h-10 w-10">4</div>
                    <div className="bg-purple-200 h-10 w-10">5</div>
                    <div className="bg-purple-200 h-10 w-10">6</div>
                    <div className="bg-purple-200 h-10 w-10">7</div>
                    <div className="bg-purple-200 h-10 w-10">8</div>
                    <div className="bg-purple-200 h-10 w-10">9</div>
                </div>
            </div>
            <div>
                <div>11. how to use Justify Content- justify-between</div>
                <div className="w-full h-40 bg-green-300 flex gap-4 justify-between flex-wrap">
                    <div className="bg-purple-200 h-10 w-10">1</div>
                    <div className="bg-purple-200 h-10 w-10">2</div>
                    <div className="bg-purple-200 h-10 w-10">3</div>
                    <div className="bg-purple-200 h-10 w-10">4</div>
                    <div className="bg-purple-200 h-10 w-10">5</div>
                    <div className="bg-purple-200 h-10 w-10">6</div>
                    <div className="bg-purple-200 h-10 w-10">7</div>
                    <div className="bg-purple-200 h-10 w-10">8</div>
                    <div className="bg-purple-200 h-10 w-10">9</div>
                </div>
            </div>
            <div>
                <div>12. How to use Align Items- items-start</div>
                <div className="w-full h-40 bg-green-300 flex gap-3 items-start">
                    <div className="bg-purple-600 h-10 w-10">1</div>
                    <div className="bg-purple-600 h-20 w-10">2</div>
                    <div className="bg-purple-600 h-16 w-10">3</div>
                </div>
            </div>
            <div>
                <div>13. How to use Align Items- items-center</div>
                <div className="w-full h-40 bg-green-300 flex gap-3 items-center">
                    <div className="bg-purple-600 h-10 w-10">1</div>
                    <div className="bg-purple-600 h-20 w-10">2</div>
                    <div className="bg-purple-600 h-16 w-10">3</div>
                </div>
            </div>
            <div>
                <div>14. How to use Align Items- items-end</div>
                <div className="w-full h-40 bg-green-300 flex gap-3 items-end">
                    <div className="bg-purple-600 h-10 w-10">1</div>
                    <div className="bg-purple-600 h-20 w-10">2</div>
                    <div className="bg-purple-600 h-16 w-10">3</div>
                </div>
            </div>
        </div>
    )
}

export default FlexTest1