import React from 'react'
import Child from './Child'

function Parent() {

    const name = ''

    const handleClcik = () => {
        alert('hello how are you')
    }
    return (
        <div>
            <Child username={name} onButtonClick={handleClcik} />
        </div>
    )
}

export default Parent