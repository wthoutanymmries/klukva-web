import React from "react"
import { RiArrowLeftRightFill } from "react-icons/ri"


import { AppDispatchStateContext } from "../../../state/AppContext"


const SetRandomSeed = () => {
  const dispatch = React.useContext(AppDispatchStateContext)

  return (
    <button
      className='flex justify-center items-center w-7 h-7 text-3xl mt-3'
      title='Расположи случайно'
      onClick={() => {
        function getRandomInt(max: number) {
          return Math.floor(Math.random() * max);
        }

        console.log('Расположи случайно')
        const randomFloat = Math.random()
        const randomInt = getRandomInt(1000000000)
        const randomSeed = `${randomFloat}:${randomInt}`
        console.log('randomSeed:', randomSeed)
        dispatch({
          type: 'setRandomSeed',
          randomSeed: randomSeed
        })
      }}
    >
      <RiArrowLeftRightFill/>
    </button>
  )
}

export default SetRandomSeed