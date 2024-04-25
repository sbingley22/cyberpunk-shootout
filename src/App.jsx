import { useState } from 'react'
import './App.css'
import Game from './components/Game'

function App() {
  const [mode, setMode] = useState(1)

  if (mode == 0) return (
    <>
      <button onClick={()=>setMode(1)}>Level 1</button>
    </>
  )

  return (
    <>
      <Game level={mode} />
    </>
  )
}

export default App
