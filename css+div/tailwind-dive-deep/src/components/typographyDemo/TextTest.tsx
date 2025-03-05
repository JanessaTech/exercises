

const TextTest = () => {
    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-3 grid-flow-col">
            <div>
                <div>1. Show how to use text-left/text-right/text-center</div>
                <div>
                    <div>
                        <div className="bg-pink-200 w-full h-40 text-left">
                        So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the break
                        </div>
                    </div>
                    <div>
                        <div className="bg-pink-400 w-full h-40 text-right">
                        So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the break
                        </div>
                    </div>
                    <div>
                        <div className="bg-pink-600 w-full h-40 text-center">
                        So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the break
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>2. Show to use text Overflow</div>
                <div>
                    <div className="my-4">
                        <div className="bg-red-100 w-full h-20 truncate">
                        The longest word in any of the majorThe longest word in any of the major
                        </div>

                    </div>
                    <div className="my-4">
                        <div className="bg-red-100 w-full h-32 text-ellipsis overflow-hidden">
                        The longest word in any of the majorThe longest worddddddddddddddddddddffffffffffdddd in any of the major
                        </div>

                    </div>
                    <div className="my-4">
                        <div className="bg-red-100 w-full h-32 text-clip overflow-hidden">
                        The longest word in any of the majorThe longest worddddddddddddddddddddffffffffffdddd in any of the major
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>3.Show to use text-wrap: text-nowrap</div>
                <div className="my-4">
                    <div className="bg-red-100 w-full h-32 text-nowrap">
                    New Yorkers are facing the winter chill with less warmth this year as the city's most revered soup stand
                    </div>
                </div>
            </div>
            <div>
                <div>4.Show to use text-wrap: text-wrap</div>
                <div className="my-4">
                    <div className="bg-red-100 w-full h-32 text-wrap">
                    New Yorkers are facing the winter chill with less warmth this year as the city's most revered soup stand
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextTest