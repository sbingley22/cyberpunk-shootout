/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"


const Merc = ({ data, target, mercAnim, shooters }) => {  
  const image = `./mercs/${data.action}-${data.name}.gif`

  const [animTimer, setAnimTimer] = useState(false)
  const [visible, setVisible] = useState(true)

  const shooterFrame = shooters.find(obj => obj.id === data.id)?.frame
  //if (shooterFrame) console.log(shooterFrame)

  useEffect(()=>{
    if (animTimer) return
    setAnimTimer(true)

    const timeoutCallback = () => {
      setAnimTimer(false)

      if (data.action == "die") {
        setVisible(false)
      }

      mercAnim(data.id, "aim")
    }

    const timeoutId = setTimeout(timeoutCallback, 1000)

    return () => clearTimeout(timeoutId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data.action])
  
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
          display: visible ? "block" : "none"
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
