import './App.css'

import { Route } from 'wouter'
import WelcomePage from './pages/WelcomePage/WelcomePage'
import GraphEditor from './pages/GraphEditor/GraphEditor'
import About from './pages/About/About'
import Weather from './pages/Weather/Weather'


function App() {
  return (
    <>
      <Route path="/" component={WelcomePage} />
      <Route path="/grapheditor" component={GraphEditor} />
      <Route path="/about" component={About} />
      <Route path="/weather" component={Weather} />
    </>
  )
}


export default App
