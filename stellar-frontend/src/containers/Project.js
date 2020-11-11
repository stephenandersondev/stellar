import React from 'react'


export default class Project extends React.Component{
    render(){
        let {project, resources} = this.props
        return(
            <div>
                <h1>{project.title}</h1>
                <h2>{project.description}</h2>
            </div>
        )
    }
}