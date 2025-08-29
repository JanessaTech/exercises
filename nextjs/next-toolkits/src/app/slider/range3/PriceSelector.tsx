'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import "./thumbbar.css"

const Axis = () => {
    return <div className="w-[300px] bg-zinc-400 h-[4px] absolute top-0"></div>
}

type PriceSelectorProps = {
    min: number;
    max: number
}
const PriceSelector: React.FC<PriceSelectorProps> = ({min = 0, max = 1000}) => {

    const [minVal, setMinVal] = useState<number>((3 * min + max) / 4);
    const [maxVal, setMaxVal] = useState<number>((min + 3 * max) / 4);
    const minValInputRef = useRef<HTMLInputElement>(null);
    const maxValInputRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);
    const minValueDivRef = useRef<HTMLDivElement>(null);
    const maxValueDivRef = useRef<HTMLDivElement>(null);
    const midRef = useRef<HTMLInputElement>(null);
    const midValueDivRef = useRef<HTMLInputElement>(null);
    const [mid, setMid] = useState((min + max) / 2)
    console.log('mid ==', mid)
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
      );
    
    useEffect(() => {
        if (midRef.current) {
            const percent = getPercent(mid);
            midRef.current.style.left = `0%`;
            midRef.current.style.width = `${percent}%`;
            console.log('mid', mid)
            console.log('mid percent', percent)
            if (midValueDivRef.current) {
                midValueDivRef.current.style.left = `${percent}%`;
            }
        }
    }, [mid])

    useEffect(() => {
    if (maxValInputRef.current) {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(Number(maxValInputRef.current.value));

        if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
        
        }
        if (minValueDivRef.current) {
            minValueDivRef.current.style.left = `${minPercent}%`;
        }
    }
    }, [minVal, getPercent]);

    useEffect(() => {
    if (minValInputRef.current) {
        const minPercent = getPercent(Number(minValInputRef.current.value));
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
        if (maxValueDivRef.current) {
            maxValueDivRef.current.style.left = `${maxPercent}%`;
        }
    }
    }, [maxVal, getPercent]);

    const onChangeLeft = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxVal - 1);
          setMinVal(value);
    }
    const onChangeRight = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minVal + 1);
        setMaxVal(value);
    }

    const handleReset = () => {
        setMinVal((3 * min + max) / 4)
        setMaxVal((min + 3 * max) / 4)
    }

    return (
        <div>
            <div className="flex justify-end flex-col relative text-xs">
                <div className="w-[300px] h-[200px] bg-zinc-600/30 absolute bottom-0"></div> 
                <div ref={midRef} className="border-dashed border-r-[1px] border-white h-[200px] box-border absolute bottom-0"></div>
                <div className="w-[300px] h-0 relative bg-zinc-900">
                    <Axis/>
                    <div ref={range} className="bg-pink-600/30 h-[200px] absolute bottom-0 group" >
                        <div className="text-white w-fit px-2 py-1 absolute top-20 left-[-50px]">10%</div>
                        <div className="text-white w-fit px-2 py-1 absolute top-20 right-[-50px]">10%</div>
                    </div>
                    <input 
                        className="thumbbar w-[300px] z-10" 
                        type="range" 
                        min={min}
                        max={max}
                        value={minVal}
                        ref={minValInputRef}
                        onChange={onChangeLeft}
                        /> 
                    <input 
                        className="thumbbar w-[300px] z-20" 
                        type="range" 
                        min={min}
                        max={max}
                        value={maxVal}
                        ref={maxValInputRef}
                        onChange={onChangeRight}
                        /> 
                    <div ref={midValueDivRef} className="text-white absolute bottom-[-25px]">{mid}</div>
                    <div ref={minValueDivRef} className="text-white absolute bottom-[-25px]">{minVal}</div>
                    <div ref={maxValueDivRef} className="text-white absolute bottom-[-25px]">{maxVal}</div> 
                </div>
            </div>
            <div className="mt-8 flex justify-end items-center text-white">
                <div className=" pr-1 pl-2 py-1 rounded-l-full bg-zinc-400/30 hover:bg-zinc-200/30 active:bg-zinc-100/30">
                    <svg 
                        className="size-5 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6" />
                    </svg>
                </div>
                <div className=" pl-1 pr-2 py-1 rounded-r-full bg-zinc-400/30 hover:bg-zinc-200/30 active:bg-zinc-100/30">
                    <svg 
                        className="size-5 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                    </svg>

                </div>
                <div>

                </div>
                <div className="h-7 text-xs px-2 py-1 bg-zinc-400/30 hover:bg-zinc-200/30 active:bg-zinc-100/30 rounded-full w-fit text-white cursor-pointer flex items-center ml-2"
                    onClick={handleReset}> <span>Reset</span></div>
            </div>
        </div>    
    )
}

export default PriceSelector