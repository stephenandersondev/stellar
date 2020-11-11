import { Component } from 'react';

const Card = ({ item, displayDetails }) => {
    return(
    <div onClick={() => displayDetails(item)} className='card'>
        <img src={item.links[0]["href"]} alt='broken' />
    </div>
    )
}

export default Card;