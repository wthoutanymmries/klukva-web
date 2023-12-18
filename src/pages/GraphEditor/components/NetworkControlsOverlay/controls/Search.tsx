import React from "react"
import { RiSearchLine } from "react-icons/ri"


import {
  AppStateContext,
  AppDispatchStateContext
} from "../../../state/AppContext"


const Search = ({networkRef}) => {
  const appState = React.useContext(AppStateContext)
  const dispatch = React.useContext(AppDispatchStateContext)

  return (
    <div>
      <button
        className='flex justify-center items-center w-7 h-7 text-3xl mt-3'
        title='Поиск'
        onClick={() => {
          console.log('Поиск')
        }}
      >
        <RiSearchLine/>
      </button>
    </div>
  )
}

export default Search