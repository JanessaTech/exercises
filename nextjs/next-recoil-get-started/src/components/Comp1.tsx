'use client'

import { type DemoState} from "@/lib/Atoms"
import { demoState } from "@/lib/Atoms"
import { useRecoilState } from "recoil"

type Comp1Props = {}
const Comp1: React.FC<Comp1Props> = () => {
    console.log('Comp1 is rendering...')
    const [input, setInput] = useRecoilState<DemoState>(demoState)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({value: e.target.value})
    }

    return (
        <div>
            <input
            id='demo'
            name='demo'
            type="text"
            value={input.value}
            className="border-red-500 border-2"
            onChange={handleInputChange}
            />
        </div>
    )
}

export default Comp1