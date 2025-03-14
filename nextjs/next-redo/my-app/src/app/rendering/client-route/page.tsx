'use client'

import React from 'react';
import { ImageSlider } from '@/components/ImageSlider';
import { useUser } from '@/components/UserProvider';
import { clientSideFunction } from '@/utils/client-utils';

//import { serverSideFunction } from "@/app/utils/server-uitils"

export default function ClientRoutePage() {
    console.log('Client route rendered')
    // const res = serverSideFunction()
    const res = clientSideFunction()
    const user = useUser()
    return (
        <>
        <div>ClientRoutePage</div>
        <ImageSlider/>
        <p>{res}</p>
        <div>
          <span>Name:{user.name}</span><br/>
          <span>Age:{user.age}</span>
        </div>
        </>
        
    )
}