import { useState } from 'react'
import './App.css'
import Game from './components/Game'

function App() {
  const [level, setLevel] = useState(0)
  const [song, setSong] = useState(0)
  const [runners, setRunners] = useState(0)
  const [missionScore, setMissionScore] = useState(0)
  const [difficulty, setDifficulty] = useState(1)
  const [wordList, setWordList] = useState(0)

  const handleSongChange = (event) => {
    setSong(parseInt(event.target.value))
  }

  const handleRunnersChange = (event) => {
    setRunners(parseInt(event.target.value))
  }

  const handleDifficultyChange = (event) => {
    setDifficulty(parseInt(event.target.value))
  }

  const handleWordsChange = (event) => {
    setWordList(parseInt(event.target.value))
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

  if (level == 99) return (
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
      <div
        style={{
          padding: "20px",
          margin: "20px"
        }}
      >
        <button onClick={()=>setLevel(0)}>Return</button>
        <h3>General:</h3>
        <p>Can you make it to the top of Arasaka tower? Choose your runner and other settings for a mission. David uses the mouse for controls, Lucy the keyboard.</p>

        <h3>David Martinez:</h3>
        <p>Shoot by holding down the mouse button. Let go of the lmb to take cover behind the cyber shield when the enemy is about to shoot. Activate the sandevistan when it charges to dodge all attacks for a short time.</p>

        <h3>Lucy Kushinada:</h3>
        <p>Lucy must hack into her enemies to destroy them. Use the spacebar to hack all enemies interfaces and see the death codes. Type the death code whilst behind cover then press space to kill the enemy assuming the spelling is correct. Ignore spaces. Her special ability charges all shields and grants her temporary invunerability.</p>

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
          
          <div>
            <h5>Word List:</h5>
            <label>
              <input type="radio" value={0} checked={wordList === 0} onChange={handleWordsChange} />
              Cyberpunk
            </label>
            <label>
              <input type="radio" value={1} checked={wordList === 1} onChange={handleWordsChange} />
              Coding
            </label>
            <label>
              <input type="radio" value={2} checked={wordList === 2} onChange={handleWordsChange} />
              Left Handed
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
          <button onClick={()=>setLevel(99)}>How To Play</button>
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
        wordList={wordList}
      />
    </>
  )
}

export default App
