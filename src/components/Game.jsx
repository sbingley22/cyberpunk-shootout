/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react"
import Player from "./Player"
import Merc from "./Merc"
import { v4 as uuidv4 } from 'uuid';
import Drone from "./Drone";

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

const Game = ({ level, setLevel, song, runners, setMissionScore, difficulty }) => {
  const [playerAction, setPlayerAction] = useState("cover")
  const [mercs, setMercs] = useState([])
  const [drones, setDrones] = useState([])
  const [wave, setWave] = useState(0)

  const [shooting, setShooting] = useState(false)
  const [ammo, setAmmo] = useState(6)
  const target = useRef(null)
  const [health, setHealth] = useState(100)
  const [shield, setShield] = useState(255)
  const score = useRef(0)
  const [showCompleteButton, setShowCompleteButton] = useState(false)

  const [sandevistan, setSandevistan] = useState(0)
  const [activatedSandevistan, setActivatedSandevistan] = useState(false)

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

    if (allDronesDead && allMercsDead) {
      setTimeout(()=>setWave(wave + 1), 1000)
      //console.log("New wave:", wave)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mercs, drones])

  const spawnWave = () => {
    const waves = waveData[level]
    //console.log(wave)
    //console.log(waves)
    //console.log("Spawning")

    if (waves.length <= wave) {
      //console.log("Level complete")
      setShowCompleteButton(true)
      return
    }

    setShield(255)
    setHealth(health + 10)

    const droneAmount = waves[wave].drones
    const mercAmount = waves[wave].mercs

    const tempDrones = []
    for (let index = 0; index < droneAmount; index++) {
      const name = Math.floor(Math.random() * 3)
      const top = Math.random() * 30
      const left = Math.random() * 80 + 5
      const tempDrone = {
        id: uuidv4(),
        name: name,
        top: top+"%",
        left: left+"%",
        width: 128,
        height: 128,
        health: 100
      }
      tempDrones.push(tempDrone)
    }
    setDrones(tempDrones)

    const tempMercs = []
    for (let index = 0; index < mercAmount; index++) {
      //const name = Math.floor(Math.random() * 3)
      const top = Math.random() * 10 + 40
      let left = Math.random() * 85
      if (left < 50 && left > 30) left += 20
      const tempMerc = {
        id: uuidv4(),
        name: "m1",
        top: top+"%",
        left: left+"%",
        width: 128,
        height: 256,
        health: 100,
        action: "aim"
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

  // Enemy Taking Shot
  useEffect(() => {
    const timeoutCallback = () => {
      setEnemyLoop(prev => !prev)

      if (activatedSandevistan) {
        setSandevistan(prev => prev - 12)
      } else {
        if (sandevistan < 1000) setSandevistan(prev => prev + 3)
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

  const shootAtPlayer = () => {
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

  const mercAnim = (id, anim) => {
    setMercs(prevItems => prevItems.map(item => {
      if (item.id === id) {
        return { ...item, action: anim };
      }
      return item;
    }));
  }

  const handlePointerDown = () => {
    const actionAccepted = updatePlayerAction("shoot")
    if (actionAccepted) {
      setShooting(true)
    }
  }

  const handlePointerUp = () => {
    updatePlayerAction("cover")
    setShooting(false)
    setTimeout(setAmmo(10), 500)
  }

  const levelComplete = () => {
    setMissionScore(score.current)
    setLevel(-2)
  }

  const background = `url(./levels/level-${level}-background.png)`

  return (
    <div 
      className="arena"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
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
          shooters={shooters}
        />
      ))}

      { mercs.map( (merc) => (
        <Merc 
          key={merc.id}
          data={merc}
          target={target}
          mercAnim={mercAnim}
          shooters={shooters}
        />
      ))}

      <Player 
        playerAction={playerAction} 
        health={health} 
        ammo={ammo} 
        shield={shield}
        sandevistan={sandevistan}
        activatedSandevistan={activatedSandevistan}
        setActivatedSandevistan={setActivatedSandevistan} 
      />

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
