import './App.css'

import { Route } from 'wouter'
import WelcomePage from './pages/WelcomePage/WelcomePage'
import GraphEditor from './pages/GraphEditor/GraphEditor'
import About from './pages/About/About'


function App() {
  return (
    <>
      <Route path="/" component={WelcomePage} />
      <Route path="/grapheditor" component={GraphEditor} />
      <Route path="/about" component={About} />
    </>
  )
}


export default App
