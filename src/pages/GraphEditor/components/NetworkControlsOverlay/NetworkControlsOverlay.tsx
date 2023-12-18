import React from 'react'

// import {
//   RiBubbleChartLine,
//   RiBubbleChartFill,
//   RiGitPullRequestLine,
//   RiGitPullRequestFill,
//   RiGitClosePullRequestLine,
//   RiGitClosePullRequestFill,
//   RiArrowLeftRightLine,
//   RiArrowLeftRightFill,
//   // Иерархическое расположение
//   RiOrganizationChart,
//   RiKnifeBloodLine,
//   RiRouteFill,
//   RiRouteLine,
//   RiMistFill,
//   RiSparkling2Fill,
//   RiBrush3Fill,
//   RiArrowRightFill
// } from "react-icons/ri"

import AddNode from './controls/AddNode'
import AddEdge from './controls/AddEdge'
import ChangeEdge from './controls/ChangeEdge'
import ShowData from './controls/ShowData'
import ShowArrows from './controls/ShowArrows'
import DeleteSelected from './controls/DeleteSelected'
import SetRandomSeed from './controls/SetRandomSeed'
import ColorPicker from './controls/ColorPicker'
import Search from './controls/Search'
import Code from './controls/Code/Code'
import Settings from './controls/Settings'
// import MistDebug from './controls/MistDebug'


const NetworkControlsOverlay = ({networkRef}) => {
  return (
    <div className='absolute top-4 left-4 z-10 flex flex-col w-7 h-fit bg-transparent text-white'>
      <AddNode networkRef={networkRef}/>
      <AddEdge networkRef={networkRef}/>
      <ChangeEdge networkRef={networkRef}/>
      <ShowData networkRef={networkRef}/>
      <ShowArrows/>
      <DeleteSelected networkRef={networkRef}/>
      <SetRandomSeed/>
      <ColorPicker networkRef={networkRef}/>
      <Search networkRef={networkRef}/>
      <Code networkRef={networkRef}/>
      <Settings networkRef={networkRef}/>
      {/* <MistDebug networkRef={networkRef}/> */}
    </div>
  )
}

export default NetworkControlsOverlay