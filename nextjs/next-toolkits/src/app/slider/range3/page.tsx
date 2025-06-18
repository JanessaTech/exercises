'use client'

import PriceSelector from "./PriceSelector";

const Range3: React.FC<{}> = () => {
    
    return (
        <div className="w-full h-screen flex justify-center items-center bg-zinc-900">
            <PriceSelector min={500} max={2000}/>

        </div>
        
    )
}

export default Range3