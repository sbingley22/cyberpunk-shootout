import { useState } from 'react'
import './App.css'
import Game from './components/Game'

function App() {
  const [level, setLevel] = useState(0)
  const [song, setSong] = useState(0)
  const [runners, setRunners] = useState(0)
  const [missionScore, setMissionScore] = useState(0)

  const handleSongChange = (event) => {
    setSong(parseInt(event.target.value))
  }

  const handleRunnersChange = (event) => {
    setRunners(parseInt(event.target.value))
  }

  if (level == -1) return (
    <div className="menu">
      <div>
        <button onClick={()=>setLevel(0)}>Return</button>
      </div>
      <div>
        <h1>Mission Score:</h1>
        <h2>{missionScore}</h2>
      </div>
    </div>
  )

  if (level == 0) return (
    <div className='menu'>
      <div>
        <h1>Cyberpunk Edgerunners Shootout</h1>
      </div>
      <div style={{ marginTop: "0px" }}>
        <h4>Assignment:</h4>
        <button onClick={()=>setLevel(1)}>Ripper Lab</button>
        <button onClick={()=>setLevel(2)}>Back Alley</button>
        <button onClick={()=>setLevel(6)}>Graveyard</button>
      </div>
      <div>
        <div>
          <h5>Runners:</h5>
          <label>
            <input type="radio" value={0} checked={runners === 0} onChange={handleRunnersChange} />
            David Martinez
          </label>
          <label>
            <input type="radio" value={1} checked={runners === 1} onChange={handleRunnersChange} />
            Lucy Kushinada
          </label>
          <label>
            <input type="radio" value={2} checked={runners === 2} onChange={handleRunnersChange} />
            David and Lucy
          </label>
        </div>

        <div>
          <h5>Radio:</h5>
          <label>
            <input type="radio" value={0} checked={song === 0} onChange={handleSongChange} />
            No music
          </label>
          <label>
            <input type="radio" value={1} checked={song === 1} onChange={handleSongChange} />
            Stay at your house
          </label>
          <label>
            <input type="radio" value={2} checked={song === 2} onChange={handleSongChange} />
            Rebel Path
          </label>
          <label>
            <input type="radio" value={3} checked={song === 3} onChange={handleSongChange} />
            Resist and Disorder
          </label>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Game 
        level={level} 
        setLevel={setLevel}
        song={song} 
        runners={runners}
        setMissionScore={setMissionScore}
      />
    </>
  )
}

export default App
