
const PseudoTest1 = () => {
    return (
        <div className="grid grid-cols-6 grid-rows-4 grid-flow-col gap-2">
            <div>
                <div>1. How to use hover etc</div>
                <div>
                    <div className="bg-zinc-400 w-fit h-10 hover:bg-red-500 active:bg-orange-500">button1</div>
                </div>
            </div>
            <div>
                <div>2. How to use first: last:</div>
                <div>
                    <ul>
                        <li  className="first:bg-red-600 last:bg-blue-600"> li1</li>
                        <li  className="first:bg-red-600 last:bg-blue-600"> li2</li>
                        <li  className="first:bg-red-600 last:bg-blue-600"> li3</li>
                    </ul>
                </div>
            </div>

            <div>
                <div>3. How to use odd & even</div>
                <div>
                    <table>
                        <tbody>
                            <tr className="odd:font-semibold even:italic">
                                <td>name1</td><td>age1</td>
                            </tr>
                            <tr className="odd:font-semibold even:italic">
                                <td>name2</td><td>age2</td>
                            </tr>
                            <tr className="odd:font-semibold even:italic">
                                <td>name2</td><td>age2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    )
}

export default PseudoTest1