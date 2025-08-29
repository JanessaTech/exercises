'use client'

import PriceSelector from "./PriceSelector";

const Range3: React.FC<{}> = () => {
    
    return (
        <div className="w-full h-screen flex justify-center items-center bg-zinc-900">
            <PriceSelector min={1000} max={3000}/>

        </div>
        
    )
}

export default Range3