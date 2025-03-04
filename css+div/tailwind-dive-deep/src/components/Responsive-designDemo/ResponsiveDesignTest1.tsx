
const ResponsiveDesignTest1 = () => {
    return(
        <div className="grid grid-cols-4 grid-rows-5 gap-2 grid-flow-col">
            <div>
                <div>1. basic usage: md:</div>
                <div className="text-red-500 md:text-blue-700">
                    <span>Janessa</span>
                </div>
            </div>
            <div>
                <div>2. how to specify breakpoint range</div>
                <div>
                    <div className="text-red-700 sm:max-md:text-blue-700">
                        <span>Janessa</span>
                    </div>
                </div>
            </div>
            <div>
                <div>3. How to apply styles under a breakpoint</div>
                <div>
                    <div className="text-red-600 max-md:text-blue-600">
                        <span>Jansssa</span>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default ResponsiveDesignTest1