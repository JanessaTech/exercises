import fs from 'fs'
import { ClientComponentOne } from './client-component-one'
import { ServerComponentTwo } from './server-component-two'

export const ServerComponentOne = () => {
    fs.readFileSync('src/components/server-component-one.tsx', 'utf-8')
    return (
        <>
        <h1>Server componnet one</h1>
        </>
    )
    
}