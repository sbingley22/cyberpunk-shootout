/* eslint-disable react/prop-types */

const Player = ({ playerAction, health, ammo, shield, sandevistan, setActivatedSandevistan, activatedSandevistan }) => {  
  const image = `./davidMartinez/${playerAction}.gif`
  const left = 25
  const bottom = 0

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: left+6+"%", 
          bottom:bottom+10+"%",
          width: "250px",
          height: "250px",
          backgroundColor: `rgba(${255-shield}, 0, ${shield}, ${shield < 1 ? 0 : 0.5})`,
          borderRadius: 50
        }}
      />

      <img 
        className="player" 
        src={image} 
        alt="" 
        style={{
          left: left+"%", 
          bottom:bottom+"%",
          backgroundColor: activatedSandevistan ? "rgba(0,255,0,0.2)" : "rgba(0,255,0,0)",
          borderRadius: 100
        }}
        draggable={false}
      />

      <div
        style={{
          position: "absolute",
          left: left-5+"%", 
          bottom: bottom+"%",
          fontSize: "larger"
        }}
      >
        { sandevistan >= 1000 && 
          <button 
            onClick={()=>setActivatedSandevistan(true)}
            style={{ backgroundColor: "green" }}
          >
              Activate!
            </button>
          }
        <p
        style={{
          color: sandevistan < 500 ? "red" : sandevistan < 750 ? "yellow" : "white"
        }}
        >
          Sandevistan: {sandevistan}
        </p>
        <p
        style={{
          color: ammo < 2 ? "red" : ammo < 4 ? "yellow" : "white"
        }}
        >
          Ammo: {ammo}
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

      <h1
        style={{
          position: "absolute",
          left: left+15+"%", 
          bottom: bottom+45+"%",
          color: "red",
          backgroundColor: "#111111",
          border: "solid 5px black",
          borderRadius: 25,
          padding: ammo < 1 ? "25px" : "0"
        }}
      >
        {ammo < 1 && "Reload!!!"}
      </h1>
    </>
  )
}

export default Player
