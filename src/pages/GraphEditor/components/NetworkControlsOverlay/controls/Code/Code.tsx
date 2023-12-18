import React from "react"
import { RiCodeSSlashLine, RiCloseFill } from "react-icons/ri"
import Modal from 'react-modal'
import Terminal from 'react-console-emulator'

import AceEditor from "react-ace"
import 'ace-builds/src-noconflict/mode-javascript'
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/ext-searchbox"
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/snippets/javascript"


import {
  AppStateContext,
  AppDispatchStateContext
} from "../../../../state/AppContext"


const Code = ({networkRef}) => {
  const appState = React.useContext(AppStateContext)
  const dispatch = React.useContext(AppDispatchStateContext)

  const [modalIsOpen, setIsOpen] = React.useState(false)
  const handleOpenModal = () => {
    setIsOpen(true)
  }
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const [codeToSandbox, setCodeToSandbox] = React.useState(
    `// Вам доступны объекты 'nodes' и 'edges'
// Для обновления графа верните объект вида
//   { type: 'update', nodes: [], edges: [] }
// или используйте update(nodes, edges) в конце файла
// Для вывода в консоль верните объект вида
//   { type: 'text', text: 'Hello, klukva!' }
// или используйте print('Hello, klukva!') в конце файла
// Чтобы скопировать текст в буфер обмена верните объект вида
//   { type: 'copy', text: 'Hello, klukva!' }
// или используйте copy('Hello, klukva!') в конце файла
// Нажмите Cmd-r для запуска скрипта

let textToPrint = ''
nodes.forEach((element) => {
  const line = JSON.stringify(element)
  textToPrint = \`\${textToPrint}\\n\${line}\`
})
print(textToPrint)
`
    );


  const iframeRef = React.useRef(null)
  const iframeContent = `<!-- frame.html -->
  <!DOCTYPE html>
  <html>
      <head>
      <script>
          window.addEventListener('message', function (e) {
          var mainWindow = e.source;
          var result = '';
          try {
              result = eval(e.data);
          } catch (e) {
              result = 'eval() threw an exception.';
              console.log(e)
          }
          mainWindow.postMessage(result, event.origin);
          });
      </script>
      </head>
  </html>`


  const terminalRef = React.useRef(null)
  const terminalCommands = {
    help: {
      description: 'Показать список команд и их описание',
      usage: 'echo <string>',
      fn: function () {
        return getTerminalCommandsDescriptions(terminalCommands)
      }
    },
    clear: {
      description: 'Очистить консоль',
      fn: function () {
        terminalRef.current.clearStdout()
      }
    },
    nodes: {
      description: "Показать все узлы",
      fn: function (copyToClipboard: string) {
        const nodeData = appState.visNetworkState.data.nodes.get()
        if ('-c' === copyToClipboard) {
          navigator.clipboard.writeText(JSON.stringify(nodeData, null, 2))
          return 'JSON с узлами скопирован в буфер обмена'
        }

        let textToPrint = '{'
        nodeData.forEach((element: any) => {
          textToPrint = `${textToPrint}\n<span style="margin-left: 17px">{</span>\n`
          Object.keys(element).forEach((key) => {
            textToPrint = `${textToPrint}\n<span style="margin-left: 34px">${key}: ${element[key]},</span>`
          })
          textToPrint = `${textToPrint}\n<span style="margin-left: 17px">},</span>`
        })
        textToPrint += '\n}'

        return textToPrint
      }
    },
    edges: {
      description: "Показать все рёбра",
      fn: function (copyToClipboard: string) {
        const edgesData = appState.visNetworkState.data.edges.get()
        if ('-c' === copyToClipboard) {
          navigator.clipboard.writeText(JSON.stringify(edgesData, null, 2))
          return 'JSON с рёбрами скопирован в буфер обмена'
        }

        let textToPrint = '{'
        edgesData.forEach((element: any) => {
          textToPrint = `${textToPrint}\n<span style="margin-left: 17px">{</span>\n`
          Object.keys(element).forEach((key) => {
            textToPrint = `${textToPrint}\n<span style="margin-left: 34px">${key}: ${element[key]},</span>`
          })
          textToPrint = `${textToPrint}\n<span style="margin-left: 17px">},</span>`
        })
        textToPrint += '\n}'

        return textToPrint
      }
    },
    n: {
      description: 'Добавить узел',
      fn: function(...parameters: string[]) {
        try {
          console.log('appState.addedIds', appState.addedIds)
          console.log(appState.consoleCommandHasBeenExecuted)
          const node = JSON.parse(parameters.join(''))
          dispatch({
            type: 'addNodeThroughConsole',
            node: node,
            terminalRef: terminalRef
          })
        } catch (error) {
          console.log(error)
          return 'Параметр должен быть в формате JSON\nИспользуйте двойные кавычки'
        }
      },
      // explicitExec: true
    },
    e: {
      description: 'Добавить ребро',
      fn: function(...parameters: string[]) {
        try {
          const edge = JSON.parse(parameters.join(''))

          if ('from' in edge === false || 'to' in edge === false) {
            return `Минимальный набор полей должен содержать поля
{"from": idOfNode1, "to": idOfNode2}`
          }
          
          if (null === appState.visNetworkState.data.nodes.get(edge.from)) {
            return `Узел с id: <span style="color:#eb144c">${edge.from}</span> не найден`
          }
          if (null === appState.visNetworkState.data.nodes.get(edge.to)) {
            return `Узел с id: <span style="color:#eb144c">${edge.to}</span> не найден`
          }
          
          dispatch({
            type: 'addEdgeThroughConsole',
            edge: edge,
            terminalRef: terminalRef
          })
        } catch (error) {
          console.log(error)
          return 'Параметр должен быть в формате JSON\nИспользуйте двойные кавычки'
        }
      }
    }
  }


  React.useEffect(() => {
    // Не безопасно
    // Я не разобрался с ебучим webpack'ом
    const doc = iframeRef.current.contentWindow.document
    doc.open()
    doc.write(iframeContent)
    doc.close()

    const messageListener = (e) => {
      // if (e.origin === "null" && e.source === iframeRef.current.contentWindow) {
      console.log('Result: ' + e.data);

      if (undefined === e.data) {
        return;
      }

      switch (e.data.type) {
        case 'update': {
          dispatch({
            type: 'onChangeNodeData',
            data: e.data.nodes
          })
          dispatch({
            type: 'onChangeEdgeData',
            data: e.data.edges
          })
          break
        }

        case 'text': {
          console.log(e.data.text)
          terminalRef.current.pushToStdout(e.data.text)
          break
        }

        case 'clear': {
          terminalRef.current.clearStdout()
          break
        }

        case 'copy': {
          navigator.clipboard.writeText(e.data.text)
          break
        }
      
        default: {
          console.log('Неизвестный тип сообщения')
          console.log('e.data', e.data)
          break
        }
      }
      // }
    }

    window.addEventListener('message', messageListener);

    return () => {
      window.removeEventListener('message', messageListener)
    }
  }, [])


  return (
    <div>
      <button
        className='flex justify-center items-center w-7 h-7 text-3xl mt-3'
        title='Скрипт'
        onClick={() => {
          console.log('Скрипт')
          handleOpenModal()
        }}
      >
        <RiCodeSSlashLine/>
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
            height="70%"
            width='100%'
            value={codeToSandbox}
            mode="javascript"
            theme="github"
            fontSize="14px"
            highlightActiveLine={true}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
              // useWorker: false,
              enableBasicAutocompletion: true,
              enableSnippets: true,
              enableLiveAutocompletion: true
            }}
            // editorProps={{
            //   useWorker: false,
            // }}
            focus={true}
            commands={[
              {
                name: 'run',
                bindKey: {win: "Ctrl-r", mac: "Command-r"},
                exec: (editor) => {
                  const value = editor.getValue()
                  console.log('onEditorRunCode:', value)

                  const nodesData = JSON.stringify(
                    appState.visNetworkState.data.nodes.get()
                  )
                  const edgesData = JSON.stringify(
                    appState.visNetworkState.data.edges.get()
                  )
                
                  const iframeCode = `
let nodes = ${nodesData}

let edges = ${edgesData}

const print = (value) => {
  return {
    type: 'text',
    text: value
  }
}

const clear = () => {
  return {
    type: 'clear'
  }
}

const copy = (text) => {
  return {
    type: 'copy',
    text: text
  }
}

const update = (nodes, edges) => {
  return { type: 'update', nodes: nodes, edges: edges }
}
`

                  iframeRef.current.contentWindow.postMessage(
                    `${iframeCode}\n\n${value}`,
                    '*'
                  )
                  setCodeToSandbox(value)
                }
              }
            ]}
          />

          <Terminal
            ref={terminalRef}
            style={{
              borderRadius: "0px",
              maxHeight: '30%'
            }}
            promptLabelStyle={{
              color: '#eb144c'
            }}
            inputTextStyle={{
              color: 'white'
            }}
            commands={terminalCommands}
            dangerMode
            noDefaults
            welcomeMessage={'<span style="color:white">Добро пожаловать в</span> <span style="color:#eb144c">Клюкву</span>!'}
            errorText={'Команда \'[command]\' не найдена.'}
            promptLabel={'console@klukva$'}
          />

        </div>

      </Modal>

      {/* allow-same-origin здесь как fix всратого говна на 38й строчке */}
      <iframe
        sandbox='allow-scripts allow-same-origin'
        src='about:blank'
        // src='frame.html'
        className="w-0 h-0"
        ref={iframeRef}
      >
      </iframe>
    </div>
  )
}

export default Code


const getTerminalCommandsDescriptions = (commands: any) => {
  let result: string = ''
  Object.keys(commands).forEach((key) => {
    result = `${result}${key} - ${commands[key].description}\n`
  })
  return result
}