'use client'

import { demoState, type DemoState } from "@/lib/Atoms"
import { useRecoilState, useSetRecoilState } from "recoil"

type Comp2Props = {}
const Comp2: React.FC<Comp2Props> = () => {
    console.log('Comp2 is rendering...')
    const [input, setInput] = useRecoilState<DemoState>(demoState)
    return (
        <div>
            {input.value} in Comp2
        </div>
    )
}

export default Comp2