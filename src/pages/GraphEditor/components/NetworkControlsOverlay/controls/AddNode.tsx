import React from "react"
import { RiBubbleChartLine } from "react-icons/ri"


import {
  AppStateContext,
  AppDispatchStateContext
} from "../../../state/AppContext"


const AddNode = ({networkRef}) => {
  const appState = React.useContext(AppStateContext)
  const dispatch = React.useContext(AppDispatchStateContext)

  return (
    <button
      className='flex justify-center items-center w-7 h-7 text-3xl'
      title='Добавь узел'
      onClick={() => {
        console.log('Добавь узел')

        // Ещё пока не решил, как лучше
        networkRef.current.addNodeMode()

        // networkRef.current.once('click', (params) => {
        //   console.log(params)
        //   dispatch({
        //     type: 'addNode',
        //     node: {
        //       "id": appState.visNetworkState.nextId,
        //       "value": 13,
        //       "label": "New",
        //       "x": params.pointer.canvas.x,
        //       "y": params.pointer.canvas.y
        //     }
        //   })
        // })
      }}
    >
      <RiBubbleChartLine/>
    </button>
  )
}

export default AddNode