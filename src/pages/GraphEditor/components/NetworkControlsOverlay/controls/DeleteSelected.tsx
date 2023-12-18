import { RiKnifeBloodLine } from "react-icons/ri"


const DeleteSelected = ({networkRef}) => {
  return (
    <button
      className='flex justify-center items-center w-7 h-7 text-3xl mt-3'
      title='Удали выделенное'
      onClick={() => {
        console.log('Удали выделенное')
        networkRef.current.deleteSelected()
      }}
    >
      <RiKnifeBloodLine/>
    </button>
  )
}

export default DeleteSelected