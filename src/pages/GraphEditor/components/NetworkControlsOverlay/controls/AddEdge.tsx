import { RiRouteLine } from "react-icons/ri"


const AddEdge = ({networkRef}) => {
  return (
    <button
      className='flex justify-center items-center w-7 h-7 text-3xl mt-3'
      title='Добавь звено'
      onClick={() => {
        console.log('Добавь звено')
        networkRef.current.addEdgeMode()
      }}
    >
      {/* <RiGitPullRequestFill/> */}
      <RiRouteLine/>
    </button>
  )
}

export default AddEdge