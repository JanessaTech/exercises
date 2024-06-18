import Card from '@/components/card'
import React from 'react'
import Link from 'next/link'

export default function ArchivedNotifications() {
  return (
    <Card>
        <div>Archived Noticaitions</div>
        <Link href="/complex-dashboard">Default</Link>
    </Card>
  )
}

