import React from 'react'
import { useImmerReducer } from 'use-immer'
import vis, { DataSet, Network } from 'vis-network/standalone/esm/vis-network'

import { AppStateContext, AppDispatchStateContext } from './state/AppContext'
import AppReducer from './state/AppReducer'
import VisNetwork from './components/VisNetwork/VisNetwork'


const GraphEditor = (props: any) => {
  const [state, dispatch] = useImmerReducer(
    AppReducer,
    initialState
  )

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchStateContext.Provider value={dispatch}>
        <VisNetwork className="h-full w-full bg-transparent"/>
      </AppDispatchStateContext.Provider>
    </AppStateContext.Provider>
  )
}

export default GraphEditor


const initialState = {
  visNetworkState: {
    nextId: 11,
    data: {
      nodes: new DataSet([
        {id: 1,  value: 2,  label: "Algie", "color": "violet"},
        {id: 2,  value: 31, label: "Alston", "shape": "square"},
        {id: 3,  value: 12, label: "Barney"},
        {id: 4,  value: 16, label: "Coley" },
        {id: 5,  value: 17, label: "Grant", color: "yellow" },
        {id: 6,  value: 15, label: "Langdon", color: "#7bdcb5"},
        {id: 7,  value: 6,  label: "Lee"},
        {id: 8,  value: 5,  label: "Merlin"},
        {id: 9,  value: 30, label: "Mick"},
        {id: 10, value: 18, label: "Tod"}
      ]),
      edges: new DataSet([
        {from: 2, to: 8, value: 3},
        {from: 2, to: 9, value: 5, color: "#eb144c"},
        {from: 2, to: 10,value: 1},
        {from: 4, to: 6, value: 8, color: "#7bdcb5"},
        {from: 5, to: 7, value: 2, color: "violet", "dashes": true, "label": "Leidenschaftlich"},
        {from: 4, to: 5, value: 2, color: "violet", "arrows": { "middle": { "enabled": true, "type": "inv_curve" } }},
        // {from: 4, to: 5, value: 2, "color": "violet"},
        {from: 9, to: 10,value: 2},
        {from: 2, to: 3, value: 6},
        {from: 3, to: 9, value: 4},
        {from: 5, to: 3, value: 1},
        {from: 2, to: 7, value: 4}
      ])
    },
    options: {
      configure: {
        enabled: false,
      },

      nodes: {
        chosen: {
          // label: function(values, id, selected, hovering) {
          //   values.color = '#fff'
          // },
          node: function(values, id, selected, hovering) {
            // if (hovering && !selected) return;
            if (hovering && !selected) {
              values.shadowColor = values.color
              return
            }

            if (selected) {
              values.color = '#86efad'
              return
            }
          }
        },

        shape: "dot",
        font: {
          size: 14,
          color: "#fff",
          face: "verdana"
        },
        borderWidth: 0,
        borderWidthSelected: 0,
        color: {
          border: "transparent",
          background: "#fff",
          // highlight: {
          //   // border: "transparent"
          //   background: "#000",
          // },
          // hover: {
          //   background: "aqua"
          // }
        },
        shadow: {
          enabled: true,
          color: "rgba(0,0,0,1)",
          size: 20,
          x: 0,
          y: 0
        },
        scaling: {
          customScalingFunction: function (
            min: number,
            max: number,
            total: number,
            value: number
          ) { return value / total; },
          min: 5,
          max: 150
        },
        physics: false
      },

      edges: {
        hoverWidth: 0,
        chosen: {
          // label: function(values, id, selected, hovering) {
          //   values.color = '#fff'
          // },
          // edge: function(values, id, selected, hovering) {
          //   if (hovering && !selected) return;
          //   values.color = '#000'
          // }
          edge: function(values, id, selected, hovering) {
            // if (hovering && !selected) return;
            if (hovering && !selected) {
              values.shadowColor = values.color
              return
            }

            if (selected) {
              values.color = '#86efad'
              return
            }
          }
        },

        arrows: {
          middle: {
            enabled: false,
          },
        },
        // arrows: undefined,
        color: {
          color: "#fff",
          // highlight: "#000",
          // hover: "aqua"
          // hover: "rgba(0,0,0,0)"
        },
        dashes: false,
        font: {
          size: 14,
          color: "aqua",
          face: "verdana",
          strokeWidth: 0,
          align: "top",
        },
        labelHighlightBold: false,
        shadow: {
          enabled: true,
          color: "rgba(0,0,0,1)",
          // color: "aqua",
          size: 20,
          x: 0,
          y: 0
        },
      },

      interaction: {
        hover: true,
        keyboard: {
          enabled: false,
          autoFocus: false,
          bindToWindow: false
        },
        multiselect: true,
        zoomSpeed: 0.4,
        selectConnectedEdges: false,
        hoverConnectedEdges: true
      },

      layout: {
        randomSeed: "0.1999942407155823:42"
      }
    }
  }
}


// Типы стрелок
// var arrow_types = [
//   "arrow",
//   "bar",
//   "circle",
//   "box",
//   "crow",
//   "curve",
//   "inv_curve",
//   "diamond",
//   "triangle",
//   "inv_triangle",
//   "vee",
// ];


// manipulation: {
//   enabled: false,
//   addNode: function(nodeData, callback) {
//     nodeData.label = 'hello'
//     confirm("сделать так?")
//     callback(nodeData)
//   },
//   addEdge: function(edgeData, callback) {
//     edgeData.label = 'shitstain'
//     callback(edgeData)
//   }
// }