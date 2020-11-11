import React from 'react'

const DetailsDisplay = ({ item, exitDisplay, visible }) => {
    return (
        <div style={{ visibility: visible ? "visible" : "hidden"}}>
            <h1>{item[0]?.title}</h1>
            <button onClick={() => exitDisplay()}>Exit</button>
        </div>
    )
}

export default DetailsDisplay