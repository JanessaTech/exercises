
const ObjectFit = () => {
    return (
        <div className="grid grid-cols-2 grid-row4 gap-3">
            <div className="border-2 border-blue-500 w-full h-20">
                <img src="imgs/book.png" alt="" className="object-cover w-52 h-10 border-2 border-red-600"/>
            </div>
            <div className="border-2 border-blue-500 w-full h-20">
                <img src="imgs/book.png" alt="" className="object-contain w-52 h-10 border-2 border-red-600"/>
            </div>
            <div className="border-2 border-blue-500 w-full h-20">
                <img src="imgs/book.png" alt="" className="object-fill w-52 h-10 border-2 border-red-600"/>
            </div>
            
        </div>
    )
}

export default ObjectFit