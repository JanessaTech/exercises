'use client'

import MultiRangeSlider from "./MultiRangeSlider"

const Range: React.FC<{}> = () => {
    return (
        <MultiRangeSlider
        min={0}
        max={1000}
        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
    />
    )
}

export default Range