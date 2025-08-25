'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import "./thumb.css"

const Tracker = () => {
    return <div className="w-[300px] bg-zinc-400 h-[10px] absolute top-[-5px]"></div>
}

type Range2Props = {
    min: number;
    max: number
}
const Range2: React.FC<Range2Props> = ({min = 0, max = 1000}) => {
    const [minVal, setMinVal] = useState<number>(min);
    const [maxVal, setMaxVal] = useState<number>(max);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
      );
    
    useEffect(() => {
    if (maxValRef.current) {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(Number(maxValRef.current.value));

        if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
        }
        console.log('minPercent=', minPercent)
        console.log('maxPercent=', maxPercent)
    }
    }, [minVal, getPercent]);

    useEffect(() => {
    if (minValRef.current) {
        const minPercent = getPercent(Number(minValRef.current.value));
        const maxPercent = getPercent(maxVal);

        if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }
    }, [maxVal, getPercent]);

    const onChangeLeft = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxVal - 1);
          setMinVal(value);
          e.target.value = value.toString();
    }
    const onChangeRight = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minVal + 1);
        setMaxVal(value);
        e.target.value = value.toString();
    }

    console.log('minVal=', minVal + ' maxVal=', maxVal)
    return (
        <div className="w-full h-screen flex justify-center items-center">
                
            <div className="w-[300px] h-0 relative bg-zinc-600">
                <Tracker/>
                <div ref={range} className="bg-orange-600 h-[10px] absolute top-[-5px]" />
                <input 
                    className="thumb w-[300px] thumb--zindex-3" 
                    type="range" 
                    min={min}
                    max={max}
                    value={minVal}
                    ref={minValRef}
                    onChange={onChangeLeft}
                    /> 
                <input 
                    className="thumb w-[300px] thumb--zindex-4" 
                    type="range" 
                    min={min}
                    max={max}
                    value={maxVal}
                    ref={maxValRef}
                    onChange={onChangeRight}
                    /> 
                <div className="flex justify-between mt-5">
                    <div>{minVal}</div>
                    <div>{maxVal}</div>
                </div> 
            </div>
        </div>
    )
}
export default Range2