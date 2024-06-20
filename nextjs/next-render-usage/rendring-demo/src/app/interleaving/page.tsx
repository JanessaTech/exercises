import { ClientComponentOne } from '@/components/client-component-one'
import { ServerComponentOne } from '@/components/server-component-one'
import React from 'react'

export default function InterleavingPage() {
  return (
    <>
        <h1>InterleavingPage</h1>
        <ClientComponentOne >
            <ServerComponentOne/>
        </ClientComponentOne>
    </>
    
  )
}

