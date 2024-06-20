import React from 'react'
import { cookies } from '../../../node_modules/next/headers'

export default function About() {
  const cookieStore = cookies()
  const theme = cookieStore.get("theme")
  console.log('theme = ', theme)
  console.log('About server componnet')
  return (
    <h1>About page {new Date().toLocaleDateString()}</h1>
  )
}

