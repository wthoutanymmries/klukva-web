import React from "react"
import { RiArrowRightLine } from "react-icons/ri"


import {
  AppStateContext,
  AppDispatchStateContext
} from "../../../state/AppContext"


const ShowArrows = () => {
  const dispatch = React.useContext(AppDispatchStateContext)

  return (
    <button
      className='flex justify-center items-center w-7 h-7 text-3xl mt-3'
      title='Покажи/скрой стрелки на рёбрах'
      onClick={() => {
        console.log('Покажи/скрой стрелки на рёбрах')
        
        dispatch({
          type: 'toggleArrowsOnEdges'
        })
      }}
    >
      <RiArrowRightLine/>
    </button>
  )
}

export default ShowArrows