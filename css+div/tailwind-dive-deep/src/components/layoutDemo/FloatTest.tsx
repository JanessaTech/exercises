

const FloatTest = () => {
    return (
        <div className="grid grid-cols-3 grid-rows-5 gap-4">
            <div className="border-2 border-blue-600">
                <img className="float-right w-40" src="imgs/book.png"></img>
                <p>Maybe we can live without libraries, people like you and me. Maybe we can live without libraries, people like you and me. Maybe we can live without libraries, people like you and me. </p>
            </div>
            <div className="border-2 border-blue-600">
                <img className="float-left w-40" src="imgs/book.png"></img>
                <p>Maybe we can live without libraries, people like you and me. Maybe we can live without libraries, people like you and me. Maybe we can live without libraries, people like you and me. </p>
            </div>
        </div>
    )
}

export default FloatTest