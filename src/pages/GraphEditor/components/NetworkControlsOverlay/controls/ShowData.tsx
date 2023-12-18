import React from "react"
import { RiDatabase2Line, RiCloseFill } from "react-icons/ri"
import Modal from 'react-modal'

import AceEditor from "react-ace"
import 'ace-builds/src-noconflict/mode-json'
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/ext-searchbox"


import {
  AppStateContext,
  AppDispatchStateContext
} from "../../../state/AppContext"


const ShowData = ({networkRef}) => {
  const appState = React.useContext(AppStateContext)
  const dispatch = React.useContext(AppDispatchStateContext)

  const [modalIsOpen, setIsOpen] = React.useState(false)
  const handleOpenModal = () => {
    setIsOpen(true)
  }
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const [editorValue, setEditorValue] = React.useState('')
  const [isNode, setIsNode] = React.useState(undefined)

  const nodesDocumentation = `// См. полный список опций по ссылке
// visjs.github.io/vis-network/docs/network/nodes.html
// Узлы также могут содержать произвольные данные`
  const edgesDocumentation = `// См. полный список опций по ссылке
// visjs.github.io/vis-network/docs/network/edges.html
// Звенья также могут содержать произвольные данные`

  return (
    <div>
      <button
        className='flex justify-center items-center w-7 h-7 text-3xl mt-3'
        title='Показать/изменить данные'
        onClick={() => {
          console.log('Показать/изменить данные')

          const selectedNodesAndEdges = networkRef.current.getSelection()
          console.log('selectedNodesAndEdges:', selectedNodesAndEdges)

          if (
            0 === selectedNodesAndEdges.nodes.length &&
            0 === selectedNodesAndEdges.edges.length
          ) {
            alert('Выберите узел или звено')
            return
          }

          if (
            selectedNodesAndEdges.nodes.length +
            selectedNodesAndEdges.edges.length > 1
          ) {
            alert('Просмотреть/изменить данные можно только у одного узла/звена за раз')
            return
          }

          if (selectedNodesAndEdges.nodes.length > 0) {
            const data = appState.visNetworkState.data.nodes.get(
              selectedNodesAndEdges.nodes[0]
            )
            setIsNode(true)
            setEditorValue(
              `${nodesDocumentation}\n${JSON.stringify(data, null, 2)}`
            )
          }
          else {
            const data = appState.visNetworkState.data.edges.get(
              selectedNodesAndEdges.edges[0]
            )
            setIsNode(false)
            setEditorValue(
              `${edgesDocumentation}\n${JSON.stringify(data, null, 2)}`
            )
          }

          handleOpenModal()
        }}
      >
        <RiDatabase2Line/>
      </button>

      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={handleCloseModal}
        // style={customStyles}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
        // closeTimeoutMS={300}
      >
        <div className='h-full flex flex-col w-100 bg-aqua overflow-hidden'>
          <button
            className='flex justify-center items-center w-7 h-7 text-3xl ml-auto mr-2 mt-2'
            onClick={handleCloseModal}
          >
            <RiCloseFill/>
          </button>

          <AceEditor
            // className='rounded'
            height="100%"
            width='100%'
            value={editorValue}
            mode="json"
            theme="github"
            fontSize="14px"
            highlightActiveLine={true}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2
            }}
            focus={true}
            commands={[
              {
                name: 'save',
                bindKey: {win: "Ctrl-s", mac: "Command-s"},
                exec: (editor) => {
                  const value = editor.getValue()
                  const parsedValue = JSON.parse(stripJSONComments(value))
                  console.log('onEditorSave:', parsedValue)

                  // setCode(value)
                  if (isNode) {
                    dispatch({
                      type: 'onChangeNodeData',
                      data: parsedValue
                    })
                  }
                  else {
                    dispatch({
                      type: 'onChangeEdgeData',
                      data: parsedValue
                    })
                  }
                }
              }
            ]}
          />
        </div>
      </Modal>
    </div>
  )
}

export default ShowData


const stripJSONComments = (data: string) => {
  var re = new RegExp("\/\/(.*)", "g");
  return data.replace(re, '');
}