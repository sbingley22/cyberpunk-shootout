/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"


const Merc = ({ data, target, lucyShooting, mercAnim, shooters, runners }) => {  
  const image = `./mercs/${data.action}-${data.name}.gif`

  const [animTimer, setAnimTimer] = useState(false)
  const [visible, setVisible] = useState(true)

  const shooterFrame = shooters.current.find(obj => obj.id === data.id)?.frame
  //if (shooterFrame) console.log(shooterFrame)

  useEffect(()=>{
    if (animTimer) return
    //setAnimTimer(true)

    const timeoutCallback = () => {
      setAnimTimer(false)

      //console.log(data.action)
      if (data.action == "die") {
        setVisible(false)
        //console.log("setting visible")
      }

      mercAnim(data.id, "aim")
    }

    const timeoutId = setTimeout(timeoutCallback, 1000)

    return () => clearTimeout(timeoutId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])
  
  const setTarget = () => {
    target.current = data.id
    //console.log("targeting", data.id)
  }
  const removeTarget = () => {
    if (target.current == data.id) {
      target.current = null
      //console.log("target removed")
    }
  }

  return (
    <>
      <img 
        className="enemy" 
        src={image} 
        alt="" 
        style={{
          left: data.left, 
          top: data.top,
          width: data.width+"px",
          height: data.height+"px",
          display: visible ? "block" : "none",
          pointerEvents: visible ? "auto" : "none"
        }}
        draggable={false}
        onPointerEnter={setTarget}
        onPointerLeave={removeTarget}
      />

      { shooterFrame && <div
        style={{
          position: "absolute",
          userSelect: "none",
          pointerEvents: "none",
          left: data.left, 
          top: data.top,
          marginLeft: "20px",
          marginTop: "20px",
          width: "50px",
          height: "50px",
          border: "solid 10px rgba(111,111,0,0.5)",
          backgroundColor: shooterFrame < 7 ? "rgba(255,11,0, 0.8)" : shooterFrame < 14 ? "rgba(211,111,0, 0.6)" : "rgba(111,111,0, 0.3)",
          borderRadius: 50
        }}
      /> }

      { runners != 0 && lucyShooting && <p
        style={{
          position: "absolute",
          left: data.left, 
          top: data.top,
          marginTop: "100px",
          color: "white",
          backgroundColor: "#111111",
          padding: "5px",
          borderRadius: 10,
          border: "solid 2px grey",
          zIndex: 99,
          display: data.health > 0 ? "auto" : "none"
        }}
      >
        {data.health > 0 && data.word}
      </p> }

      <p
        style={{
          position: "absolute",
          left: data.left, 
          top: data.top,
          color: data.health < 33 ? "red" : data.health < 66 ? "yellow" : "white"
        }}
      >
        {data.health > 0 && data.health}
      </p>
    </>
  )
}

export default Merc
