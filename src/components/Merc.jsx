/* eslint-disable react/prop-types */


const Merc = ({ data }) => {
  
  const image = `./mercs/${data.action}-${data.name}.gif`
  return (
    <img 
      className="enemy" 
      src={image} 
      alt="" 
      style={{left: data.left, top: data.top}}
      draggable={false}
    />
  )
}

export default Merc
