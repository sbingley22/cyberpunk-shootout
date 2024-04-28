/* eslint-disable react/prop-types */

const Lucy = ({ isMobile, lucyAction, health, shield, hack, setActivatedHack, activatedHack }) => {
  const image = `./lucyKushinada/${lucyAction}.gif`
  const left = isMobile ? 0 : 50
  const bottom = 0

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: left+10+"%", 
          bottom:bottom+10+"%",
          width: "250px",
          height:  isMobile ? "160px" : "200px",
          backgroundColor: `rgba(${255-shield}, 0, ${shield}, ${shield < 1 ? 0 : 0.5})`,
          borderRadius: 50,
          userSelect: "none",
          pointerEvents: "none"
        }}
      />

      <img 
        className="player" 
        src={image} 
        alt="" 
        style={{
          left: left+"%", 
          bottom:bottom+"%",
          backgroundColor: activatedHack ? "rgba(0,255,0,0.2)" : "rgba(0,255,0,0)",
          borderRadius: 100,
          width: isMobile ? "360px" : "450px"
        }}
        draggable={false}
      />

      <div
        style={{
          position: "absolute",
          left: left+5+"%", 
          bottom: bottom+"%",
          fontSize: "larger"
        }}
      >
        { hack >= 1000 && 
          <button 
            onClick={()=>setActivatedHack(true)}
            style={{ backgroundColor: "green" }}
          >
              Activate!
            </button>
          }
        <p
        style={{
          color: hack < 500 ? "red" : hack < 750 ? "yellow" : "white"
        }}
        >
          Hacking: {hack}
        </p>
        <p
        style={{
          color: shield < 2 ? "red" : shield < 4 ? "purple" : "white"
        }}
        >
          Shield: {shield}
        </p>
        <p
        style={{
          color: health < 33 ? "red" : health < 66 ? "yellow" : "white"
        }}
        >
          Health: {health}
        </p>
      </div>
    </>
  )
}

export default Lucy
