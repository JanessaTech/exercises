'use client'

import { useForm } from "react-hook-form" 
import { yupResolver } from "@hookform/resolvers/yup"
import SignupSchema from "@/lib/SignupSchema"
import { useState } from "react";

//type SignupFormData = yup.InferType<typeof SignupSchema>
type SignupStateType = {
    name: string,
    intro: string,
    checked: boolean
}

type HookformDemoProps = {}
const HookformDemo:React.FC<HookformDemoProps> = () => {
    const [state, setState] = useState<SignupStateType>({
        name: '',
        intro: '',
        checked: false
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(SignupSchema)
      });

    const onSubmit = handleSubmit((data) => {
        console.log('Input data: ', data)
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        // notice here that I am using [e.target.name] to get the name of element we are working on
        setState({...state, [e.target.name]: e.target.value})  
    }

    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, 'checked': !state.checked})
    }

    const handleClear = () => {
        reset()
        setState({
            name: '',
            intro: '',
            checked: false})
    }

    console.log("state:", state)

    return (
        <div className="flex justify-center items-center my-10">
            <form 
                onSubmit={onSubmit}
                noValidate
                autoComplete="off"
                >
                    <div>
                        Name:<input
                            id="name"
                            type="text"
                            value={state.name}
                            {...register('name')}
                            placeholder="Display Name" 
                            onChange={handleInputChange}
                            className="border-[1px] border-zinc-500 rounded-md"
                        />
                        <div className={`text-xs h-4 text-red-600 ${errors?.name ? 'visible' : 'invisible'}`}>{errors?.name?.message}</div>
                    </div>
                    <div>
                        Intro:<textarea
                            id="intro"
                            value={state.intro}
                            {...register('intro')}
                            placeholder="Introduce yourself" 
                            onChange={handleInputChange}
                            className="border-[1px] border-zinc-500 rounded-md"
                        />
                        <div className={`text-xs h-4 text-red-600 ${errors?.intro ? 'visible' : 'invisible'}`}>{errors?.intro?.message}</div>
                    </div>
                    <div>
                        Check:<input 
                            type="checkbox" 
                            checked={state.checked}
                            {...register('checked')}
                            onChange={handleCheckBoxChange}
                            />
                        <span>You have to check it</span>
                        <div className="text-xs h-4 text-red-600">{errors?.checked?.message}</div>
                    </div>
                    <div>
                        <button type="submit" className="bg-green-700 rounded-full px-3 py-1 text-white">Sign Up</button>
                        <button onClick={handleClear} className="bg-zinc-600 rounded-full px-3 py-1 mx-2 text-white">Clear</button>
                    </div>
            </form>
        </div>
    )
}

export default HookformDemo