/* eslint-disable react/prop-types */

const Cover = ({ coverState }) => {
  const image = `./props/barrel-${coverState}.png`
  //console.log(image)
  return (
    <img 
      className="prop" 
      src={image} 
      alt="" 
      style={{left: "25%", bottom: "5%"}}
      draggable={false}
    />
  )
}

export default Cover
