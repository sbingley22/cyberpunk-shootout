/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react"
import Player from "./Player"
import Merc from "./Merc"
import { v4 as uuidv4 } from 'uuid'
import Drone from "./Drone"
import Lucy from "./Lucy"

const wordsCyber = [
  "augment",
  "mech",
  "tech",
  "choom",
  "neurojack",
  "cyberspace",
  "hacktivist",
  "cyberware",
  "cyberdeck",
  "nanotech",
  "enhancement",
  "cybernetic",
  "virtuality",
  "holo-sim",
  "neon",
  "neuro-enhancer",
  "cyberdrome",
  "plas-fiber",
  "enhanced reality",
  "neuro-link",
  "synthskin",
  "gridlock",
  "neonopolis",
  "biomod",
  "cyber-sleuth",
  "simstim",
  "dystopia",
  "techno-organic",
  "replicant",
  "telematics",
  "braindance",
  "transhuman",
  "cybernetics",
  "digi-gang",
  "mech-suit",
  "synthwave",
  "neuro-gang",
  "chrome",
  "holo-lens",
  "neuro-dive",
  "megacorp",
  "cyber-ninja",
  "brain-hack",
  "nano-fog",
  "datalink",
  "cyberphobia",
  "cyber-crime",
  "mech-soldier",
  "synth-pop",
  "neuro-scrambler",
  "cyber-drone",
  "brain-interface"
]
const wordsCode = 
[
"useState()",
"array[]",
"x&&y",
"forLoop",
"statement",
"function()",
"variable",
"object",
"method",
"parameter",
"argument",
"callback",
"eventListener",
"promise",
"async/await",
"try/catch",
"module",
"import",
"export",
"constructor",
"this keyword",
"prototype",
"closure",
"callback hell",
"REST API",
"JSON",
"XMLHttpRequest",
"fetch()",
"axios",
"middleware",
"package manager",
"npm",
"yarn",
"dependency",
"devDependency",
"package.json",
"node.js",
]
const wordsLeft = [
  "we",
  "ad",
  "as",
  "aw",
  "sea",
  "swede",
  "deed",
  "seed",
  "ewe",
  "wade",
  "wee",
  "awe",
  "wed",
  "weed",
  "ewe",
  "awed",
  "ease",
  "added",
  "dead",
  "dede",
  "see",
  "seed",
  "sad",
  "ewe",
  "awed",
  "sea",
  "sew",
  "wade",
  "wed",
  "wad",
  "aw",
  "awed",
  "deed",
  "dead",
  "saw",
  "sew",
  "see",
  "weed",
  "wed",
  "wee",
  "awe",
  "seed",
  "sew",
  "we",
  "wed"
]

const waveData = {
  1: [
    {
      wave: 0,
      drones: 2,
      mercs: 1,
    },
    {
      wave: 1,
      drones: 3,
      mercs: 1,
    },
    {
      wave: 2,
      drones: 3,
      mercs: 2,
    },
    {
      wave: 3,
      drones: 3,
      mercs: 2,
    },
    {
      wave: 4,
      drones: 5,
      mercs: 2,
    },
    {
      wave: 5,
      drones: 8,
      mercs: 1,
    },
    {
      wave: 6,
      drones: 6,
      mercs: 2,
    },
    {
      wave: 7,
      drones: 7,
      mercs: 3,
    }
  ],
  2: [
    {
      wave: 0,
      drones: 2,
      mercs: 0,
    },
    {
      wave: 1,
      drones: 3,
      mercs: 0,
    },
    {
      wave: 2,
      drones: 3,
      mercs: 0,
    },
    {
      wave: 3,
      drones: 6,
      mercs: 0,
    },
    {
      wave: 4,
      drones: 8,
      mercs: 0,
    },
    {
      wave: 5,
      drones: 9,
      mercs: 0,
    },
    {
      wave: 6,
      drones: 10,
      mercs: 0,
    },
    {
      wave: 7,
      drones: 12,
      mercs: 0,
    }
  ],
  6: [
    {
      wave: 0,
      drones: 2,
      mercs: 1,
    },
    {
      wave: 1,
      drones: 3,
      mercs: 1,
    },
    {
      wave: 2,
      drones: 3,
      mercs: 2,
    },
    {
      wave: 3,
      drones: 3,
      mercs: 2,
    },
    {
      wave: 4,
      drones: 5,
      mercs: 2,
    },
    {
      wave: 5,
      drones: 5,
      mercs: 3,
    },
    {
      wave: 6,
      drones: 6,
      mercs: 3,
    },
    {
      wave: 7,
      drones: 10,
      mercs: 1,
    },
    {
      wave: 8,
      drones: 8,
      mercs: 3,
    },
    {
      wave: 9,
      drones: 7,
      mercs: 4,
    }
  ],
  9: [
    {
      wave: 0,
      drones: 4,
      mercs: 2,
    },
    {
      wave: 1,
      drones: 5,
      mercs: 1,
    },
    {
      wave: 2,
      drones: 5,
      mercs: 2,
    },
    {
      wave: 3,
      drones: 6,
      mercs: 2,
    },
    {
      wave: 4,
      drones: 8,
      mercs: 2,
    },
    {
      wave: 5,
      drones: 7,
      mercs: 3,
    },
    {
      wave: 6,
      drones: 7,
      mercs: 3,
    },
    {
      wave: 7,
      drones: 10,
      mercs: 1,
    },
    {
      wave: 8,
      drones: 8,
      mercs: 3,
    },
    {
      wave: 9,
      drones: 10,
      mercs: 4,
    }
  ]
}

const Game = ({ isMobile, level, setLevel, song, runners, setMissionScore, difficulty, wordList }) => {
  const [playerAction, setPlayerAction] = useState("cover")
  const [lucyAction, setLucyAction] = useState("cover")
  const [mercs, setMercs] = useState([])
  const [drones, setDrones] = useState([])
  const [wave, setWave] = useState(0)
  const [waveInterim, setWaveInterim] = useState(false)

  const [shooting, setShooting] = useState(false)
  const [ammo, setAmmo] = useState(6)
  const target = useRef(null)
  const [health, setHealth] = useState(100)
  const [shield, setShield] = useState(255)
  const [sandevistan, setSandevistan] = useState(0)
  const [activatedSandevistan, setActivatedSandevistan] = useState(false)
  
  const [lucyShooting, setLucyShooting] = useState(false)
  const [lucyHealth, setLucyHealth] = useState(100)
  const [lucyShield, setLucyShield] = useState(255)
  const [hack, setHack] = useState(0)
  const [activatedHack, setActivatedHack] = useState(false)
  
  const score = useRef(0)
  const [showCompleteButton, setShowCompleteButton] = useState(false)

  const [enemyLoop, setEnemyLoop] = useState(false)
  const shooters = useRef([])

  const songYourHouseRef = useRef(null)
  const resistDisorderRef = useRef(null)
  const rebelPathRef = useRef(null)

  const audioGunshot = useRef(null)
  const audioPlayerHit = useRef(null)
  const audioEnemyHit = useRef(null)
  const audioReload = useRef(null)
  const audioShieldHit = useRef(null)
  const audioKill = useRef(null)

  const inputRef = useRef(null)
  const words = wordList == 0 ? wordsCyber : wordList == 1 ? wordsCode : wordsLeft

  // Input Ref
  useEffect(() => {
    if (inputRef.current == null) return
    inputRef.current.focus()
  }, )

  // Start Song
  useEffect(()=>{
    audioGunshot.current.volume = 0.5

    if (song == 0) return
    if (song == 1) songYourHouseRef.current.play()
    else if (song == 2) resistDisorderRef.current.play()
    else if (song == 3) rebelPathRef.current.play()
  }, [song])

  // Initialize Waves
  useEffect(()=>{
    setTimeout(()=>spawnWave(), 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wave])

  // Check for wave end
  useEffect(()=>{
    if (drones.length == 0 && mercs.length == 0) return

    const allDronesDead = drones.every(obj => obj.health < 1)
    const allMercsDead = mercs.every(obj => obj.health < 1)

    if (allDronesDead && allMercsDead && waveInterim == false) {
      setTimeout(()=>setWave(wave + 1), 1000)
      setWaveInterim(true)
      //console.log("New wave:", wave)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mercs, drones])

  const spawnWave = () => {
    const waves = waveData[level]
    //console.log(wave)
    setWaveInterim(false)

    if (waves.length <= wave) {
      //console.log("Level complete")
      setShowCompleteButton(true)
      return
    }

    setShield(255)
    setHealth(health + 10)
    setLucyShield(255)
    setLucyHealth(lucyHealth + 10)

    const droneAmount = waves[wave].drones
    const mercAmount = waves[wave].mercs

    const tempDrones = []
    for (let index = 0; index < droneAmount; index++) {
      const name = Math.floor(Math.random() * 3)
      const top = Math.random() * 30
      let left = Math.random() * 80 + 5
      if (isMobile) left *= 0.7
      const word = Math.floor(Math.random() * words.length)
      //console.log(words[word])

      const tempDrone = {
        id: uuidv4(),
        name: name,
        top: top+"%",
        left: left+"%",
        width: 128,
        height: 128,
        health: 100,
        word: words[word]
      }
      tempDrones.push(tempDrone)
    }
    setDrones(tempDrones)

    const tempMercs = []
    for (let index = 0; index < mercAmount; index++) {
      //const name = Math.floor(Math.random() * 3)
      const top = Math.random() * 10 + 40
      let left = Math.random() * 85
      if (isMobile) left *= 0.7
      if (left < 50 && left > 30) left += 20
      const word = Math.floor(Math.random() * words.length)
      const tempMerc = {
        id: uuidv4(),
        name: "m1",
        top: top+"%",
        left: left+"%",
        width: 128,
        height: 256,
        health: 100,
        action: "aim",
        word: words[word]
      }
      tempMercs.push(tempMerc)
    }
    setMercs(tempMercs)

    //console.log(tempDrones, tempMercs)
  }

  // Sandevistan
  useEffect(() => {
    if (sandevistan < 0) setActivatedSandevistan(false)
  }, [sandevistan])

  // Hack
  useEffect(() => {
    if (hack < 0) setActivatedHack(false)
  }, [hack])
  useEffect(() => {
    if (activatedHack) {
      setLucyShield(300)
      setShield(300)
    }
  }, [activatedHack])

  // Enemy Taking Shot
  useEffect(() => {
    const timeoutCallback = () => {
      setEnemyLoop(prev => !prev)

      if (activatedSandevistan) {
        setSandevistan(prev => prev - 12)
      } else {
        if (sandevistan < 1000) setSandevistan(prev => prev + 3)
      }
      if (activatedHack) {
        setHack(prev => prev - 12)
      } else {
        if (hack < 1000) setHack(prev => prev + 3)
      }

      const aimFrames = difficulty == 1 ? 30 : difficulty == 0 ? 50 : 25
      const chanceThreshold = 0.01

      // Chance of shooting
      let tempShooters = [...shooters.current]

      mercs.forEach((merc) => {
        const isShooter = tempShooters.some(obj => obj.id === merc.id)

        if (isShooter) {
          // Aim
          tempShooters = tempShooters.map(obj => {
            if (obj.id == merc.id) {
              if (merc.health < 1) return null
              const frameShot = obj.frame - 1
              if (frameShot < 1) {
                shootAtPlayer()
                shootAtLucy()
                return null
              }
              return { ...obj, frame: frameShot}
            }
            return obj
          }).filter(obj => obj !== null)
        } else {
          // Chance to become shooter
          if (merc.health < 1) return

          const chance = Math.random()
          if (chance < chanceThreshold) {
            tempShooters.push({
              id: merc.id,
              frame: aimFrames
            })
          }
        }
      })

      drones.forEach((drone) => {
        const isShooter = tempShooters.some(obj => obj.id === drone.id)

        if (isShooter) {
          // Aim
          tempShooters = tempShooters.map(obj => {
            if (obj.id == drone.id) {
              if (drone.health < 1) return null
              const frameShot = obj.frame - 1
              if (frameShot < 1) {
                shootAtPlayer()
                shootAtLucy()
                return null
              }
              return { ...obj, frame: frameShot}
            }
            return obj
          }).filter(obj => obj !== null)
        } else {
          // Chance to become shooter
          if (drone.health < 1) return

          const chance = Math.random()
          if (chance < chanceThreshold) {
            tempShooters.push({
              id: drone.id,
              frame: aimFrames
            })
          }
        }
      })

      shooters.current = tempShooters
    }

    const timeoutId = setTimeout(timeoutCallback, 50)

    return () => clearTimeout(timeoutId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enemyLoop])

  // Shoot at targets
  useEffect(() => {
    if (!shooting) return
    if (ammo < 1) {
      setShooting(false)
      audioReload.current.currentTime = 0
      audioReload.current.play()
      return
    }

    const timeoutCallback = () => {
      //console.log("Current target:", target.current);
      audioGunshot.current.currentTime = 0
      audioGunshot.current.play()

      let tempScore = 0
      let updateOccured = null

      const updatedDrones = drones.map(drone => {
        if (drone.health < 1) return drone
        if (drone.id === target.current) {
          const updatedDrone = { ...drone, health: drone.health - 40 }
          updateOccured = drone.id
          return updatedDrone
        }
        return drone
      })
  
      if (updateOccured) {
        setDrones(updatedDrones)
        tempScore += 10
        removeShooter(updateOccured)
        audioEnemyHit.current.currentTime = 0
        audioEnemyHit.current.play()
        //console.log("Drone shot")
      }
      updateOccured = null

      const updatedMercs = mercs.map(merc => {
        if (merc.health < 1) return merc
        if (merc.id === target.current) {
          const newHealth = merc.health - 40
          const updatedMerc = { ...merc, health: newHealth, action: newHealth < 1 ? "die" : "hurt" }
          updateOccured = merc.id
          return updatedMerc
        }
        return merc
      })
  
      if (updateOccured) {
        setMercs(updatedMercs)
        tempScore += 20
        removeShooter(updateOccured)
        audioEnemyHit.current.currentTime = 0
        audioEnemyHit.current.play()
        //console.log("Merc shot")
      }

      setAmmo(prev => prev - 1)
      score.current += tempScore
    }

    const timeoutId = setTimeout(timeoutCallback, 250);

    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shooting, ammo])

  const removeShooter = (id) => {
    const tempShooters = shooters.current.filter(item => item.id !== id)

    shooters.current = tempShooters
    //console.log(shooters.length, tempShooters.length)
  }

  const updatePlayerAction = (newAction) => {
    if (playerAction == "hurt") return false
    if (playerAction == "die") return false

    setPlayerAction(newAction)

    return true
  }

  const updateLucyAction = (newAction) => {
    if (lucyAction == "hurt") return false
    if (lucyAction == "die") return false

    setLucyAction(newAction)

    return true
  }

  const shootAtPlayer = () => {
    if (runners == 1) return
    if (playerAction == "hurt") return
    if (playerAction == "die") return

    if (playerAction == "cover" && shield > 0) {
      const dmg = difficulty == 1 ? 50 : difficulty == 0 ? 25 : 70
      setShield(prev => prev - dmg)
      score.current -= 10
      audioShieldHit.current.currentTime = 0
      audioShieldHit.current.play()
      return      
    }
    
    if (activatedSandevistan) return

    // Hit player
    setShooting(false)
    score.current -= 40
    audioPlayerHit.current.currentTime = 0
    audioPlayerHit.current.play()

    const dmg = difficulty == 1 ? 25 : difficulty == 0 ? 10 : 35
    let newHealth = health - dmg
    if (newHealth < 0) {
      // player dead
      newHealth = 0
      setHealth(newHealth)
      setPlayerAction("die")
      setMissionScore(score.current)
      setTimeout(()=>{
        setLevel(-1)
      }, 3000)
      return
    }
    setHealth(newHealth)
    setPlayerAction("hurt")
    setTimeout(()=>{
      setPlayerAction("cover")
    }, 600)
  }

  const shootAtLucy = () => {
    if (runners == 0) return
    if (activatedHack) return
    if (lucyAction == "hurt") return
    if (lucyAction == "die") return

    if (lucyAction == "cover" && lucyShield > 0) {
      const dmg = difficulty == 1 ? 20 : difficulty == 0 ? 10 : 30
      setLucyShield(prev => prev - dmg)
      score.current -= 10
      audioShieldHit.current.currentTime = 0
      audioShieldHit.current.play()
      return      
    }

    // Hit lucy
    setLucyShooting(false)
    score.current -= 40
    audioPlayerHit.current.currentTime = 0
    audioPlayerHit.current.play()

    const dmg = difficulty == 1 ? 25 : difficulty == 0 ? 10 : 35
    let newHealth = lucyHealth - dmg
    if (newHealth < 0) {
      // player dead
      newHealth = 0
      setLucyHealth(newHealth)
      setLucyAction("die")
      setMissionScore(score.current)
      setTimeout(()=>{
        setLevel(-1)
      }, 3000)
      return
    }
    setLucyHealth(newHealth)
    setLucyAction("hurt")
    setTimeout(()=>{
      setLucyAction("cover")
    }, 600)
  }

  const mercAnim = (id, anim) => {
    setMercs(prevItems => prevItems.map(item => {
      if (item.id === id) {
        return { ...item, action: anim };
      }
      return item;
    }));
  }

  const handlePointerDown = () => {
    if (runners == 1) return

    const actionAccepted = updatePlayerAction("shoot")
    if (actionAccepted) {
      setShooting(true)
    }
  }

  const handlePointerUp = () => {
    if (runners == 1) return

    updatePlayerAction("cover")
    setShooting(false)
    setTimeout(setAmmo(10), 500)
  }

  const typeTest = () => {
    const inputValue = inputRef.current.value.toLowerCase().split(' ').join('')
    if (inputValue == " ") return
    //console.log(inputValue)

    const droneMatch = drones.find(drone => drone.word.toLowerCase().split(' ').join('') == inputValue);
    const mercMatch = mercs.find(merc => merc.word.toLowerCase().split(' ').join('') == inputValue);

    if (droneMatch) {
      const updatedDrones = drones.map(drone =>
        drone.id === droneMatch.id ? { ...drone, health: 0, word: "-NA-" } : drone
      )

      setDrones(updatedDrones) 
      score.current += 10
      removeShooter(droneMatch.id)
      audioEnemyHit.current.currentTime = 0
      audioEnemyHit.current.play()

      //console.log("match drone:", droneMatch.word)

    } else if (mercMatch) {
      const updatedMercs = mercs.map(merc =>
        merc.id === mercMatch.id ? { ...merc, health: 0, action: "die", word: "-NA-" } : merc
      )

      setMercs(updatedMercs) 
      score.current += 10
      removeShooter(mercMatch.id)
      audioEnemyHit.current.currentTime = 0
      audioEnemyHit.current.play()
    }

    inputRef.current.value = ""
  }

  const lucyPeek = () => {
    const actionAccepted = updateLucyAction("shoot")
    if (actionAccepted) setLucyShooting(true)

    typeTest()
    console.log("Lucy Peek", actionAccepted)
  }

  const lucyCover = () => {
    setLucyShooting(false)
    updateLucyAction("cover")
    inputRef.current.value = ""
  }

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        const actionAccepted = updateLucyAction("shoot")
        if (actionAccepted) setLucyShooting(true)

        typeTest()        
      }

      if (event.code === "Enter" || event.code == "Tab") {
        if (hack >= 1000) setActivatedHack(true)
      }
    }

    const handleKeyUp = (event) => {
      if (event.code === 'Space') {
        setLucyShooting(false)
        updateLucyAction("cover")
        inputRef.current.value = ""
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drones, mercs])

  const levelComplete = () => {
    setMissionScore(score.current)
    setLevel(-2)
  }

  const background = `url(./levels/level-${level}-background.png)`

  return (
    <div 
      className="arena mobile-no-scroll"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
      onContextMenu={(e)=>e.preventDefault()}
    >
      <div 
        className="background" 
        style={{ backgroundImage: background, backgroundColor: "black"}}
      />

      { drones.map( (drone) => (
        <Drone
          key={drone.id}
          data={drone}
          target={target}
          shooting={shooting}
          lucyShooting={lucyShooting}
          shooters={shooters}
          runners={runners}
        />
      ))}

      { mercs.map( (merc) => (
        <Merc 
          key={merc.id}
          data={merc}
          target={target}
          mercAnim={mercAnim}
          lucyShooting={lucyShooting}
          shooters={shooters}
          runners={runners}
        />
      ))}

      {runners != 1 && <Player 
        isMobile={isMobile}
        playerAction={playerAction} 
        health={health} 
        ammo={ammo} 
        shield={shield}
        sandevistan={sandevistan}
        activatedSandevistan={activatedSandevistan}
        setActivatedSandevistan={setActivatedSandevistan} 
      /> }

      {runners != 0 && <Lucy 
        isMobile={isMobile}
        lucyAction={lucyAction} 
        health={lucyHealth}
        shield={lucyShield}
        hack={hack}
        activatedHack={activatedHack}
        setActivatedHack={setActivatedHack}
      /> }

      {runners != 0 && 
        <div className="lucyInput">
          {isMobile && <button
            onPointerDown={lucyPeek}
            onPointerUp={lucyCover}
            style={{
              padding: "10px 70px",
              marginBottom: 0
            }}
          >Peek</button>}
          <input ref={inputRef} type="text" />
        </div>
      }

      { showCompleteButton && <button
        style={{
          position: "absolute",
          top: "25%",
          left: "45%",
          fontSize: "larger",
          border: "solid 4px purple"
        }}
        onClick={levelComplete}
      >Return to Base</button>}

      <audio ref={songYourHouseRef} loop>
        <source src="./audio/yourHouse.m4a" type="audio/mp4" />
      </audio>
      <audio ref={rebelPathRef} loop>
        <source src="./audio/rebelPath.m4a" type="audio/mp4" />
      </audio>
      <audio ref={resistDisorderRef} loop>
        <source src="./audio/resistDisorder.m4a" type="audio/mp4" />
      </audio>
      
      <audio ref={audioGunshot} >
        <source src="./audio/gunshot.wav" type="audio/wav" />
      </audio>
      <audio ref={audioKill} >
        <source src="./audio/kill.m4a" type="audio/wav" />
      </audio>
      <audio ref={audioPlayerHit} >
        <source src="./audio/playerHit.wav" type="audio/wav" />
      </audio>
      <audio ref={audioEnemyHit} >
        <source src="./audio/enemyHit.wav" type="audio/wav" />
      </audio>
      <audio ref={audioReload} >
        <source src="./audio/reload.wav" type="audio/wav" />
      </audio>
      <audio ref={audioShieldHit} >
        <source src="./audio/shieldHit.wav" type="audio/wav" />
      </audio>
      {/* <audio ref={audio} >
        <source src="./audio/.wav" type="audio/wav" />
      </audio> */}

    </div>
  )
}

export default Game
