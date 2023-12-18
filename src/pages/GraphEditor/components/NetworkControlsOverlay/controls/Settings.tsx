import './Modal.css'

import React from "react"
import { RiSettings3Line, RiCloseFill } from "react-icons/ri"
import Modal from 'react-modal'

import AceEditor from "react-ace"
import 'ace-builds/src-noconflict/mode-json'
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/ext-searchbox"


import {
  AppStateContext,
  AppDispatchStateContext
} from "../../../state/AppContext"


const Settings = ({networkRef}) => {
  const appState = React.useContext(AppStateContext)
  const dispatch = React.useContext(AppDispatchStateContext)

  const [modalIsOpen, setIsOpen] = React.useState(false)
  const handleOpenModal = () => {
    setIsOpen(true)
  }
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const arrowDirection =
    undefined !== appState.visNetworkState.options.edges.arrows.middle ?
    'middle'
    : undefined !== appState.visNetworkState.options.edges.arrows.to ?
    'to'
    : 'from'
  const defaultValue = `// Настройки стандартного поведения
{
  // Узлы:
  "nodes": {
    // Форма узлов может быть
    // одним из следующих значений:
    //   Текст снаружи:
    //     diamond, dot, star, triangle,
    //     triangleDown, hexagon, square
    //   Текст внутри:
    //     ellipse, circle, database, box, text
    "shape": "${appState.visNetworkState.options.nodes.shape}",
    // Настройки текста:
    "font": {
      "size": ${appState.visNetworkState.options.nodes.font.size},
      "color": "${appState.visNetworkState.options.nodes.font.color}",
      "face": "${appState.visNetworkState.options.nodes.font.face}"
    },
    // Ширина границы узла
    "borderWidth": ${appState.visNetworkState.options.nodes.borderWidth},
    // Ширина границы узла при его выделении
    "borderWidthSelected": ${appState.visNetworkState.options.nodes.borderWidthSelected},
    // Цвет:
    "color": {
      // Границы
      "border": "${appState.visNetworkState.options.nodes.color.border}",
      // Узла
      "background": "${appState.visNetworkState.options.nodes.color.background}"
    },
    // Тень под узлом
    "shadow": {
      "enabled": ${appState.visNetworkState.options.nodes.shadow.enabled},
      "color": "${appState.visNetworkState.options.nodes.shadow.color}",
      "size": ${appState.visNetworkState.options.nodes.shadow.size},
      "x": ${appState.visNetworkState.options.nodes.shadow.x},
      "y": ${appState.visNetworkState.options.nodes.shadow.y}
    },
    // Физика узлов
    "physics": ${appState.visNetworkState.options.nodes.physics}
  },

  // Звенья:
  "edges": {
    // Настройки стрелок
    "arrows": {
      // Расположение стрелки может быть
      // одним из следующих значений:
      //   to, from, middle
      "${arrowDirection}": {
        "enabled": false
      }
    },
    // Цвет
    "color": {
      "color": "${appState.visNetworkState.options.edges.color.color}"
    },
    // Отрисовываать ли звенья пунктирной линией
    "dashes": ${appState.visNetworkState.options.edges.dashes},
    // Настройки текста
    "font": {
      "size": ${appState.visNetworkState.options.edges.font.size},
      "color": "${appState.visNetworkState.options.edges.font.color}",
      "face": "${appState.visNetworkState.options.edges.font.face}",
      "strokeWidth": ${appState.visNetworkState.options.edges.font.strokeWidth},
      // Выравнивание надписи может быть
      // одним из следующих значений:
      //   horizontal, top, middle, bottom
      "align": "${appState.visNetworkState.options.edges.font.align}"
    },
    // Тень под звеном
    "shadow": {
      "enabled": ${appState.visNetworkState.options.edges.shadow.enabled},
      "color": "${appState.visNetworkState.options.edges.shadow.color}",
      "size": ${appState.visNetworkState.options.edges.shadow.size},
      "x": ${appState.visNetworkState.options.edges.shadow.x},
      "y": ${appState.visNetworkState.options.edges.shadow.y}
    }
  },
  // Семя для движка расположений
  "layout": {
    "randomSeed": "${appState.visNetworkState.options.layout.randomSeed}"
  }
}`

  const [code, setCode] = React.useState(
    // JSON.stringify(defaultValue, null, 2)
    defaultValue
  )

  // const customStyles = {
  //   content: {
  //     top: '50%',
  //     left: '50%',
  //     right: 'auto',
  //     bottom: 'auto',
  //     marginRight: '-50%',
  //     transform: 'translate(-50%, -50%)',
  //   },
  // };
  
  return (
    <div>
      <button
        className='flex justify-center items-center w-7 h-7 text-3xl mt-3'
        title='Настройки'
        onClick={() => {
          console.log('Настройки')
          handleOpenModal()
        }}
      >
        <RiSettings3Line/>
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
            value={code}
            mode="json"
            theme="github"
            fontSize="14px"
            highlightActiveLine={true}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
              // useWorker: false
            }}
            // editorProps={{
            //   useWorker: false,
            // }}
            focus={true}
            commands={[
              {
                name: 'save',
                bindKey: {win: "Ctrl-s", mac: "Command-s"},
                exec: (editor) => {
                  const value = editor.getValue()
                  const parsedValue = JSON.parse(stripJSONComments(value))
                  console.log('onEditorSave:', parsedValue)

                  setCode(value)
                  dispatch({
                    type: 'onSettingsSave',
                    options: parsedValue
                  })
                }
              }
            ]}
          />

          {/* <div className='w-full h-7 mb-2 mt-auto bg-black'></div> */}
        </div>

      </Modal>
    </div>
  )
}

export default Settings


const stripJSONComments = (data: string) => {
  var re = new RegExp("\/\/(.*)", "g");
  return data.replace(re, '');
}