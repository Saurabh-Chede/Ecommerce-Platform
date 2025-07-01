import React from 'react'

function Child({username , onButtonClick}) {
  return (
    <div>
        <h2>{username}</h2>
        <button onClick={onButtonClick}>click</button>
    </div>
  )
}

export default Child