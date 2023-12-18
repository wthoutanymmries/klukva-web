import { RiGitPullRequestLine } from "react-icons/ri"


const ChangeEdge = ({networkRef}) => {
  return (
    <button
      className='flex justify-center items-center w-7 h-7 text-3xl mt-3'
      title='Измени звено'
      onClick={() => {
        console.log('Измени звено')
        networkRef.current.editEdgeMode((params) => {
          console.log('editEdgeMode:')
        })
      }}
    >
      <RiGitPullRequestLine/>
      {/* <RiRouteLine/> */}
    </button>
  )
}

export default ChangeEdge