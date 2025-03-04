
const PositionTest1 = () => {
    return (
        <div className="grid grid-cols-2 grid-rows-3 gap-3">
            <div className="bg-blue-200 w-full h-40">
                <div className="bg-lime-300 mx-8 w-80 h-32 static">
                    <div className="bg-red-600 w-20 h-20 absolute bottom-0 left-0">absolute1</div>
                </div>
            </div>

            <div className="bg-blue-200 w-full h-40">
                <div className="bg-lime-300 mx-8 w-80 h-32 relative">
                    <div className="bg-red-600 w-20 h-20 absolute bottom-0 left-0">absolute2</div>
                </div>
            </div>
            
        </div>
    )
}

export default PositionTest1