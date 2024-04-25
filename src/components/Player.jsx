/* eslint-disable react/prop-types */
import { useState } from "react"


const Player = ({ playerAction }) => {
  
  const image = `./davidMartinez/${playerAction}.gif`
  return (
    <img 
      className="player" 
      src={image} 
      alt="" 
      style={{left: "25%", bottom: 0}}
      draggable={false}
    />
  )
}

export default Player
