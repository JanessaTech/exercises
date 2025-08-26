
const Position: React.FC<{}> = () => {
    return (
        <div className="w-full h-screen bg-zinc-300 flex justify-center items-center">
            <div className="w-[300px] h-0 relative bg-blue-700">
                <div className="bg-orange-600 h-[50px] w-[300px] absolute top-[-50px]"></div>
                <div className="bg-pink-600 h-[20px] w-[300px] absolute top-0"></div>
            </div>
        </div>
    )
}

export default Position