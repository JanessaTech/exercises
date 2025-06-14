'use client'
import { useState } from "react"

const BasicInput:React.FC<{}> = () => {
    const [value, setValue] = useState('default')

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const onBlur =(e:React.FocusEvent<HTMLInputElement>) => {
        console.log('on blur')
        if(value === '') {
            setValue('default')
        }
    }

    const onClick = (e:React.MouseEvent<HTMLInputElement>) => {
        if (value === 'default') {
            setValue('')
        }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allow = (e?.key === 'Backspace' || e?.key === 'Delete')
                    || (value === '' && e?.key >= '0' && e?.key <= '9')
                    || (value === '0' && e?.key === '.')
                    || (value.length === 1 && value >= '1' && value <= '9' && e?.key === '.')
                    || (/^\d.$/.test(value) && e?.key >= '0' && e?.key <= '9')
                    || (/^\d.\d$/.test(value) && e?.key >= '0' && e?.key <= '9')
        if (!allow) {
            e.preventDefault(); 
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-screen ">
            <div>
                <div>You are alllowed on input number from 0.00 - 9.99</div>
                <div className="relative">
                    <input 
                        type="text" 
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        onClick={onClick}
                        onKeyDown={onKeyDown}
                        className="border-[1px] border-zinc-500 rounded-md px-2 my-2"/>
                    <span className={`absolute right-40 top-2 ${(value !== 'default' &&  value !== '') ? 'text-green-600' : 'hidden'}`}>ok</span>
                </div>
                
            </div>
            
        </div>
    )
}
export default BasicInput