import { clientSideFunction } from '@/utils/client-utils'
import { serverSideFunction } from '@/utils/server-utils'
import React from 'react'

export default function ServerRoutePage() {
    const res = serverSideFunction()
    //const clientRes = clientSideFunction()
  return (
    <>
    <h1>Server Route Page</h1>
    <p>{res}</p>
    </>
    
  )
}

