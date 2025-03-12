import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About JanessaTech',
}

export default function About() {
    console.log('about log')
    return (
        <div>About</div>
    )
}