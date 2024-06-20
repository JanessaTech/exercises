"use client"
import { useTheme } from '@/components/theme-provider'
import { clientSideFunction } from '@/utils/client-utils'
//import { serverSideFunction } from '@/utils/server-utils'
import React from 'react'

export default function ClientRoutePage() {
    const theme = useTheme()
    console.log('Client route rendered')
    const result = clientSideFunction()
  return (
    <>
        <h1 style={{
            color: theme.colors.secondary
        }}>Client Route Page {result}</h1>
        {/* <p>{res}</p> */}
    </>
    
  )
}

