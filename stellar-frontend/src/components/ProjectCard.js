import React from 'react'

export default function ProjectCard({ resource, resources, reorder, editContentIn, editContentOut }) {
    return (
    <div className="pcard">
        <img className="pcard-img" src={resource.url} />
        <div>
        <p className='pcard-text' >{resource.content}</p>
        <button className="pcard-button">Edit Content</button>
        </div>
        <select onChange={(e) => reorder(resource, e)} value={resource.ord_num}>
           {resources.map((resource, index) => <option value={index + 1} >{index + 1}</option>)}
        </select>
    </div>
    )
}
