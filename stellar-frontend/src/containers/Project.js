import React from 'react'
import { Container, Carousel } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard.js'
import Modal from 'react-modal'


export default class Project extends React.Component {

    constructor() {
        super()
        this.state = {
            resources: [],
            focusedResource: '',
            modalOpen: false
        }
    }

    componentDidMount() {
        let sortedArray = this.props.resources.sort((a, b) => a.ord_num < b.ord_num ? -1 : 1)
        this.setState({
            resources: sortedArray
        })
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    render() {
        let { project } = this.props
        return (
            <div style={{ backgroundColor: "black" }}>
                <Container className="project-container" align="center">
                    <h1>{project.title}</h1>
                    <button onClick={this.props.saveResources} className="save-button">Save</button>
                    <button onClick={this.toggleModal} className="present-button">Present Project</button>
                    <Modal
                        isOpen={this.state.modalOpen}
                        style={{ overlay: { backgroundColor: 'grey' }, content: { color: "orange", backgroundColor: "#111" } }}
                        onRequestClose={this.toggleModal}
                    >
                        <Container className="modal-container" align="center">
                            <h1>{project.title}</h1>
                            <h5>{project.description}</h5>
                                {/* <button className="exit-button" onClick={this.toggleModal}>Exit Presentation</button> */}
                            <Carousel className="project-carousel" interval={null} >
                                {this.state.resources.map(resource =>
                                    <Carousel.Item>
                                        <img
                                            className="modal-image"
                                            src={resource.url}
                                            alt="slide"
                                        />
                                        <Carousel.Caption>
                                            <p>{resource.content}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </Container>
                    </Modal>
                    <div className="resource-container">
                        {this.state.resources.map(resource => <ProjectCard
                            resource={resource}
                            resources={this.state.resources}
                            reorder={this.props.reorder}
                            deleteResource={this.props.deleteResource}
                            editResource={this.props.editResource}
                        />)}
                    </div>
                </Container>
            </div>
        )
    }
}