export default function AppReducer(draft: any, action: any) {
  switch (action.type) {
    case 'setRandomSeed': {
      draft.visNetworkState.options.layout.randomSeed = action.randomSeed
      break
    }

    case 'addNode': {
      draft.visNetworkState.data.nodes.add(
        action.node
      )
      draft.visNetworkState.nextId++
      break
    }

    case 'addNodeThroughConsole': {
      const addedIds = draft.visNetworkState.data.nodes.update(
        action.node
      )
      // console.log('addedIds', addedIds)
      // Так нельзя, но я пока не знаю, как сделать иначе
      // Оно ничего нее ломает поэтому пусть пока будет так
      action.terminalRef.current.pushToStdout(`id: ${addedIds[0]}`)
      break
    }

    case 'addEdgeThroughConsole': {
      // draft.visNetworkState.data.edges.add(
      //   action.edge
      // )
      const addedIds = draft.visNetworkState.data.edges.update(
        action.edge
      )
      // console.log('addedIds', addedIds)
      // Так нельзя, но я пока не знаю, как сделать иначе
      // Оно ничего нее ломает поэтому пусть пока будет так
      action.terminalRef.current.pushToStdout(`id: ${addedIds[0]}`)
      break
    }

    case 'compareStateAndNetwork': {
      console.log("state.nodes:", draft.visNetworkState.data.nodes.get())
      console.log("state.edges:", draft.visNetworkState.data.edges.get())
      break
    }

    case 'toggleArrowsOnEdges': {
      draft.visNetworkState.options.edges.arrows.middle.enabled = !draft.visNetworkState.options.edges.arrows.middle.enabled
      break
    }

    case 'setNodesColor': {
      action.nodes.forEach((id: number | string) => {
        // console.log('setNodesColor', draft.visNetworkState.data.nodes.get(id))
        draft.visNetworkState.data.nodes.update(
          {...draft.visNetworkState.data.nodes.get(id), color: action.color}
        )
      })
      break
    }

    case 'setEdgesColor': {
      action.edges.forEach((id: number | string) => {
        // console.log('setNodesColor', draft.visNetworkState.data.nodes.get(id))
        draft.visNetworkState.data.edges.update(
          {...draft.visNetworkState.data.edges.get(id), color: action.color}
        )
      })
      break
    }

    case 'onChangeNodeData': {
      draft.visNetworkState.data.nodes.update(action.data)
      break
    }

    case 'onChangeEdgeData': {
      draft.visNetworkState.data.edges.update(action.data)
      break
    }

    case 'onSettingsSave': {
      draft.visNetworkState.options.nodes.shape =
        action.options.nodes.shape

      draft.visNetworkState.options.nodes.font.size =
        action.options.nodes.font.size
      draft.visNetworkState.options.nodes.font.color=
        action.options.nodes.font.color
      draft.visNetworkState.options.nodes.font.face =
        action.options.nodes.font.face
        
      draft.visNetworkState.options.nodes.borderWidth=
        action.options.nodes.borderWidth
      draft.visNetworkState.options.nodes.borderWidthSelected =
        action.options.nodes.borderWidthSelected

      draft.visNetworkState.options.nodes.color.border=
        action.options.nodes.color.border
      draft.visNetworkState.options.nodes.color.background=
        action.options.nodes.color.background

      draft.visNetworkState.options.nodes.shadow.enabled =
        action.options.nodes.shadow.enabled
      draft.visNetworkState.options.nodes.shadow.color =
        action.options.nodes.shadow.color
      draft.visNetworkState.options.nodes.shadow.size =
        action.options.nodes.shadow.size
      draft.visNetworkState.options.nodes.shadow.x =
        action.options.nodes.shadow.x
      draft.visNetworkState.options.nodes.shadow.y =
        action.options.nodes.shadow.y

      draft.visNetworkState.options.nodes.physics =
        action.options.nodes.physics
        
      
      draft.visNetworkState.options.edges.arrows =
        action.options.edges.arrows

      draft.visNetworkState.options.edges.color.color =
        action.options.edges.color.color

      draft.visNetworkState.options.edges.dashes =
        action.options.edges.dashes
      draft.visNetworkState.options.edges.font.size =
        action.options.edges.font.size
      draft.visNetworkState.options.edges.font.color =
        action.options.edges.font.color
      draft.visNetworkState.options.edges.font.face =
        action.options.edges.font.face
      draft.visNetworkState.options.edges.font.strokeWidth =
        action.options.edges.font.strokeWidth
      draft.visNetworkState.options.edges.font.align =
        action.options.edges.font.align
      

      draft.visNetworkState.options.edges.shadow.enabled =
        action.options.edges.shadow.enabled
      draft.visNetworkState.options.edges.shadow.color =
        action.options.edges.shadow.color
      draft.visNetworkState.options.edges.shadow.size =
        action.options.edges.shadow.size
      draft.visNetworkState.options.edges.shadow.x =
        action.options.edges.shadow.x
      draft.visNetworkState.options.edges.shadow.y =
        action.options.edges.shadow.y
      
      draft.visNetworkState.options.layout.randomSeed =
        action.options.layout.randomSeed
      
      break
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}