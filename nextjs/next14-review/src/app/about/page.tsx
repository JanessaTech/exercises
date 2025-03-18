import React from 'react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
    title: 'About JanessaTech',
}

export default function About() {
    const cookiesStore = cookies()
    const theme = cookiesStore.get('theme')
    console.log('theme = ', theme)

    console.log('about server component')
    return (
        <div>About page {new Date().toLocaleTimeString()}</div>
    )
}