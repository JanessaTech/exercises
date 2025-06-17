'use client'

import DraggableLine from "./DraggableLine"

export default function DemoPage() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Draggable Line Demo</h2>
      <DraggableLine
        onPositionChange={(percent) => 
          console.log(`Current position: ${percent.toFixed(1)}%`)
        }
      />
    </div>
  )
}
