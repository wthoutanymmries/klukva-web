import React from 'react'
import { RiBrush3Line } from 'react-icons/ri'
import { TwitterPicker } from 'react-color'


import { AppDispatchStateContext } from "../../../state/AppContext"


const ColorPicker = ({networkRef}) => {
  const dispatch = React.useContext(AppDispatchStateContext)

  const [displayColorPicker, setDisplayColorPicker] = React.useState(false)
  const [colorPickerState, setColorPickerState] = React.useState({
    color: '#FFEB3B'
  })

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleColorPickerChangeComplete = (color) => {
    // console.log('color:', color)
    const selectedNodesAndEdges = networkRef.current.getSelection()
    console.log('selectedNodesAndEdges:', selectedNodesAndEdges)

    dispatch({
      type: 'setNodesColor',
      color: color.hex,
      nodes: selectedNodesAndEdges.nodes
    })
    dispatch({
      type: 'setEdgesColor',
      color: color.hex,
      edges: selectedNodesAndEdges.edges
    })
  }

  return (
    <div>
      <button
        className='flex justify-center items-center w-7 h-7 text-3xl mt-3'
        title='Покрась'
        onClick={() => {
          console.log('Покрась')
          handleClick()
        }}
      >
        <RiBrush3Line/>
      </button>

      {
        displayColorPicker ?
          <div className='absolute z-20'>
          <div
            className='fixed top-0 right-0 bottom-0 left-0'
            onClick={handleClick}
          />
            <TwitterPicker
              color={colorPickerState.color}
              onChangeComplete={handleColorPickerChangeComplete}
            />
          </div>: null
      }
    </div>
  )
}

export default ColorPicker