import { useRef, useState, useEffect } from 'react'

interface DraggableLineProps {
  initialPosition?: number
  onPositionChange?: (position: number) => void
}

const DraggableLine: React.FC<DraggableLineProps> = ({ 
  initialPosition = 0,
  onPositionChange
}) => {
  const [position, setPosition] = useState(initialPosition)
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return
    
    const containerRect = containerRef.current.getBoundingClientRect()
    const newPosition = Math.min(
      Math.max(0, e.clientX - containerRect.left),
      containerRect.width
    )
    
    setPosition(newPosition)
    onPositionChange?.(newPosition / containerRect.width * 100)
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-8 bg-gray-200 rounded-full cursor-pointer"
      onClick={(e) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        setPosition(e.clientX - rect.left)
      }}
    >
      <div
        ref={lineRef}
        className="absolute top-0 w-1 h-8 bg-blue-500 rounded-full cursor-w-resize"
        style={{ left: `${position}px` }}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}

export default DraggableLine