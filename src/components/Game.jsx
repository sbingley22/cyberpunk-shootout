/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import Player from "./Player"
import Merc from "./Merc"
import { v4 as uuidv4 } from 'uuid';


const Game = ({ level }) => {
  const [playerAction, setPlayerAction] = useState("cover")
  const [mercs, setMercs] = useState([])

  useEffect(()=>{
    setMercs([
      {
        id: uuidv4(),
        name: "m1",
        top: "12%",
        left: "20%",
        action: "aim"
      },
      {
        id: uuidv4(),
        name: "m1",
        top: "29%",
        left: "70%",
        action: "aim"
      }
    ])
  }, [])

  const handlePointerDown = () => {
    setPlayerAction("shoot")
  }

  const handlePointerUp = () => {
    setPlayerAction("cover")
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

      { mercs.map( (merc) => (
        <Merc 
          key={merc.id}
          data={merc}
        />
      ) )}

      <Player playerAction={playerAction} />
    </div>
  )
}

export default Game
