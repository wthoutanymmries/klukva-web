import './MovingBlobBackground.css'
import React from 'react'


export default function MovingBlobBackground() {
    const [position, setPosition] = React.useState({
      x: 0,
      y: 0
    });
  
    const blobRef = React.useRef<any>(null)
    if (null !== blobRef) {
      blobRef.current?.animate(
        { left: `${position.x}px`, top: `${position.y}px` }
        , { duration: 3000, fill: "forwards" }
      )
    }

    window.onpointermove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY
      });
    }
  
    return (
      // overflow-hidden
      <div
        className={`
          h-[100vh] w-[100vw]
          bg-black
        `}
        
        >
          {/* bg-gradient-to-r from-[#ffffff] to-[#89fffd] */}
        <div
          id='blob'
          ref={blobRef}
          className={`
          bg-green-300/25
          left-1/2 top-1/2 absolute h-[24vmax] rounded-[50%] aspect-square
          `}
        />
        <div
          id='blur'
          className={`
            h-screen w-screen absolute 
            backdrop-blur-[120px] 
            bg-black bg-opacity-[0.5]`
          }
        />
      </div>
    )
  }