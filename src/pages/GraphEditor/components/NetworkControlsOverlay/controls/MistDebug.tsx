import React from "react"
import { RiMistFill } from "react-icons/ri"


import { AppDispatchStateContext } from "../../../state/AppContext"


const MistDebug = ({networkRef}) => {
  const dispatch = React.useContext(AppDispatchStateContext)

  return (
    <button
      className='flex justify-center items-center w-7 h-7 text-3xl mt-3'
      title='Сравни state и network'
      onClick={() => {
        console.log('Сравни state и network')
        console.log('network: ', networkRef.current.getConnectedNodes(2))

        dispatch({
          type: 'compareStateAndNetwork'
        })
      }}
    >
      <RiMistFill/>
    </button>
  )
}

export default MistDebug