import { useState } from 'react'
import './App.css'
import Game from './components/Game'

function App() {
  const [level, setLevel] = useState(0)
  const [song, setSong] = useState(0)
  const [runners, setRunners] = useState(0)
  const [missionScore, setMissionScore] = useState(0)
  const [difficulty, setDifficulty] = useState(1)

  const handleSongChange = (event) => {
    setSong(parseInt(event.target.value))
  }

  const handleRunnersChange = (event) => {
    setRunners(parseInt(event.target.value))
  }

  const handleDifficultyChange = (event) => {
    setDifficulty(parseInt(event.target.value))
  }

  if (level < 0) return (
    <>
      <div 
        style={{ 
          backgroundImage: level == -1 ? "url(./stills/LoseScreen.png)" : "url(./stills/WinScreen.png)", 
          position: "absolute",
          width: "100vw",
          height: "100vh",
          backgroundSize: "auto 100%",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          userSelect: "none"
        }}
      />
      <div className="menu">
        <div>
          <h1>Mission Score:</h1>
          <h2>{missionScore}</h2>
          <button style={{ marginLeft: "auto"}} onClick={()=>setLevel(0)}>Return</button>
        </div>
        <div />
        <div>
        </div>
      </div>
    </>
    
  )

  if (level == 0) return (
    <>
      <div 
        style={{ 
          backgroundImage: "url(./stills/MenuStill.png)", 
          position: "absolute",
          width: "100vw",
          height: "100vh",
          backgroundSize: "auto 100%",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          userSelect: "none"
        }}
      />
      <div className='menu'>
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
              Resist and Disorder
            </label>
            <label>
              <input type="radio" value={3} checked={song === 3} onChange={handleSongChange} />
              Rebel Path
            </label>
          </div>
          
          <div>
            <h5>Difficulty:</h5>
            <label>
              <input type="radio" value={0} checked={difficulty === 0} onChange={handleDifficultyChange} />
              Easy
            </label>
            <label>
              <input type="radio" value={1} checked={difficulty === 1} onChange={handleDifficultyChange} />
              Normal
            </label>
            <label>
              <input type="radio" value={2} checked={difficulty === 2} onChange={handleDifficultyChange} />
              Hard
            </label>
          </div>
        </div>

        <div style={{ marginTop: "0px" }}>
          <h4>Assignment:</h4>
          <button onClick={()=>setLevel(1)}>Ripper Lab</button>
          <button onClick={()=>setLevel(2)}>City</button>
          <button onClick={()=>setLevel(6)}>Graveyard</button>
          <button onClick={()=>setLevel(9)}>Arasaka Tower</button>
        </div>

        <div>
          <h1 style={{marginTop: "10px"}}>Cyberpunk Edgerunners Shootout</h1>
        </div>
      </div>
    </>
  )

  return (
    <>
      <Game 
        level={level} 
        setLevel={setLevel}
        song={song} 
        runners={runners}
        setMissionScore={setMissionScore}
        difficulty={difficulty}
      />
    </>
  )
}

export default App
