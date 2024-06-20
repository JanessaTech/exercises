"use client"
import { useTheme } from '@/components/theme-provider'
//import { serverSideFunction } from '@/utils/server-utils'
import React from 'react'

export default function ClientRoutePage() {
    const theme = useTheme()
    console.log('Client route rendered')
    //const res = serverSideFunction()
  return (
    <>
        <h1 style={{
            color: theme.colors.secondary
        }}>Client Route Page</h1>
        {/* <p>{res}</p> */}
    </>
    
  )
}

