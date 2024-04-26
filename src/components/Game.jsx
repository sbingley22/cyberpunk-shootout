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
    }
  ]
}

const Game = ({ level }) => {
  const [playerAction, setPlayerAction] = useState("cover")
  const [mercs, setMercs] = useState([])
  const [drones, setDrones] = useState([])
  const [wave, setWave] = useState(0)

  const [shooting, setShooting] = useState(false)
  const [ammo, setAmmo] = useState(6)
  const target = useRef(null)
  const [health, setHealth] = useState(100)
  const [shield, setShield] = useState(255)

  const [enemyLoop, setEnemyLoop] = useState(false)
  const [shooters, setShooters] = useState([])

  // Initialize level
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
      setTimeout(()=>setWave(wave + 1), 2000)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mercs, drones])

  const spawnWave = () => {
    const waves = waveData[level]
    //console.log(wave)
    //console.log(waves)

    if (waves.length <= wave) {
      console.log("Level complete")
      return
    }

    setShield(255)

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
      const top = Math.random() * 10 + 45
      const left = Math.random() * 85
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

  // Enemy Taking Shot
  useEffect(() => {
    const timeoutCallback = () => {
      setEnemyLoop(prev => !prev)

      // Chance of shooting
      let tempShooters = [...shooters]

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
          if (chance < 0.1) {
            tempShooters.push({
              id: merc.id,
              frame: 4
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
          if (chance < 0.1) {
            tempShooters.push({
              id: drone.id,
              frame: 4
            })
          }
        }
      })

      setShooters(tempShooters)
    }

    const timeoutId = setTimeout(timeoutCallback, 500)

    return () => clearTimeout(timeoutId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enemyLoop])

  // Shoot at targets
  useEffect(() => {
    if (!shooting) return
    if (ammo < 1) {
      setShooting(false)
      return
    }

    const timeoutCallback = () => {
      //console.log("Current target:", target.current);

      let updateOccured = false

      const updatedDrones = drones.map(drone => {
        if (drone.health < 1) return drone
        if (drone.id === target.current) {
          const updatedDrone = { ...drone, health: drone.health - 40 }
          updateOccured = true
          return updatedDrone
        }
        return drone
      })
  
      if (updateOccured) setDrones(updatedDrones)
      updateOccured = false

      const updatedMercs = mercs.map(merc => {
        if (merc.health < 1) return merc
        if (merc.id === target.current) {
          const newHealth = merc.health - 40
          const updatedMerc = { ...merc, health: newHealth, action: newHealth < 1 ? "die" : "hurt" }
          updateOccured = true
          return updatedMerc
        }
        return merc
      })
  
      if (updateOccured) setMercs(updatedMercs)

      setAmmo(prev => prev - 1)
    }

    const timeoutId = setTimeout(timeoutCallback, 500);

    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shooting, ammo])

  const updatePlayerAction = (newAction) => {
    if (playerAction == "hurt") return false

    setPlayerAction(newAction)

    return true
  }

  const shootAtPlayer = () => {
    if (playerAction == "hurt") return
    if (playerAction == "die") return

    if (playerAction == "cover" && shield > 0) {
      setShield(prev => prev - 50)
      return      
    }

    // Hit player
    setShooting(false)
    let newHealth = health - 30
    if (newHealth < 0) {
      newHealth = 0
      // player dead
      //console.log("game over")
      setHealth(newHealth)
      setPlayerAction("die")
      setTimeout(()=>{
        window.location.reload()
      }, 3000)
      return
    }
    setHealth(newHealth)
    setPlayerAction("hurt")
    setTimeout(()=>{
      setPlayerAction("cover")
    }, 800)
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

      <Player playerAction={playerAction} health={health} ammo={ammo} shield={shield} />
    </div>
  )
}

export default Game
