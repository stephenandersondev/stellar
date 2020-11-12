import React from 'react'
import { Container } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard.js'


export default class Project extends React.Component {

    constructor() {
        super()
        this.state = {
            resources: []
        }
    }

    componentDidMount() {
        let sortedArray = this.props.resources.sort((a, b) => a.ord_num < b.ord_num ? -1 : 1)
        this.setState({
            resources: sortedArray
        })
    }

    componentWillUnmount() {
        this.saveResources()
    }

    reorderResources = (resource, e) => {
        let sortedArray = this.state.resources.sort((a, b) => a.ord_num < b.ord_num ? -1 : 1)
        sortedArray.splice((resource.ord_num - 1), 1)
        sortedArray.splice((e.target.value - 1), 0, resource)
        let newOrder = sortedArray.map((resource, index) => {
            return Object.assign({}, resource, { ord_num: (index + 1) })
        })
        this.setState({
            resources: newOrder
        })
    }

    saveResources = () => {
        const resources = this.state.resources
        resources.forEach(resource => {
            fetch(`http://localhost:3000/resources/${resource.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(resource)
            })
        })
    }
    
    editResource = (e, id) => {
        let newContent = e.target[0].value
        let updatedResource = this.state.resources.filter(resource => resource.id === id)[0]
        updatedResource.content = newContent
        this.setState({
            resources: this.state.resources.map(resource =>
                resource.id === updatedResource.id ? updatedResource : resource
            )
        })
    }

    render() {
        let { project } = this.props
        return (
            <div style={{ backgroundColor: "black" }}>
                <Container className="project-container" align="center">
                    <h1>{project.title}</h1>
                    <button onClick={this.saveResources} className="save-button">Save</button>
                    <button className="present-button">Present Project</button>
                    <div className="resource-container">
                        {this.state.resources.map(resource => <ProjectCard
                            resource={resource}
                            resources={this.state.resources}
                            reorder={this.reorderResources}
                            deleteResource={this.props.deleteResource}
                            editResource={this.editResource}
                        />)}
                    </div>
                </Container>
            </div>
        )
    }
}