// import './VisNetwork.css'

import React from 'react'
import vis, { DataSet, Network } from 'vis-network/standalone/esm/vis-network'


import {
  AppStateContext,
  AppDispatchStateContext
} from '../../state/AppContext'

import NetworkControlsOverlay from '../NetworkControlsOverlay/NetworkControlsOverlay'



const VisNetwork = (props: any) => {
  const appState = React.useContext(AppStateContext)
  const dispatch = React.useContext(AppDispatchStateContext)

  // A reference to the div rendered by this component
  const domNode = React.useRef(null)

  // A reference to the vis network instance
  const network = React.useRef(null)

  React.useEffect(
    () => {
      network.current = new Network(
        domNode.current,
        appState.visNetworkState.data,
        appState.visNetworkState.options
      );
    },

    [
      domNode,
      network,
      appState.visNetworkState.data,
      appState.visNetworkState.options
    ]
  )


  return (
    <div className="flex justify-between h-[100vh] w-[100vw] bg-black">
      <NetworkControlsOverlay networkRef={network}/>
      <div ref = { domNode } className="VisNetwork z-0"/>
    </div>
  )
}


export default VisNetwork



// const handleComponentClick = (event: React.MouseEvent<HTMLDivElement>) => {
//   event.preventDefault()
//   console.log("Single click")
//   console.log(event)
// }
// const handleComponentDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
//   event.preventDefault()
//   console.log("Double click")
//   const pageX = event.pageX
//   const pageY = event.pageY
//   const componentPosition = {
//     pageX,
//     pageY
//   }
//   console.log(event.pageX, event.pageY)
//   let canvasPosition = network.current.DOMtoCanvas(componentPosition)
//   console.log("canvasPosition", canvasPosition)
// }
// useDoubleClick({
//   ref: domNode,
//   latency: 250,
//   onSingleClick: handleComponentClick,
//   onDoubleClick: handleComponentDoubleClick
// })


// const useDoubleClick = ({
//   ref,
//   latency = 300,
//   onSingleClick,
//   onDoubleClick
// }) => {
//   React.useEffect(() => {
//     const clickRef = ref.current
//     let clickCount = 0;
//     const handleClick = e => {
//       clickCount += 1

//       setTimeout(() => {
//         if (clickCount === 1) onSingleClick(e)
//         else if (clickCount === 2) onDoubleClick(e)

//         clickCount = 0
//       }, latency)
//     };

//     // Add event listener for click events
//     clickRef.addEventListener('click', handleClick)

//     // Remove event listener
//     return () => {
//       clickRef.removeEventListener('click', handleClick)
//     }
//   })
// }