import React from 'react'
import { Container, Carousel } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard.js'
import Modal from 'react-modal'


export default class Project extends React.Component {

    constructor() {
        super()
        this.state = {
            resources: [],
            focusedResource: ''
        }
    }

    componentDidMount() {
        let sortedArray = this.props.resources.sort((a, b) => a.ord_num < b.ord_num ? -1 : 1)
        this.setState({
            resources: sortedArray
        })
    }

   

    render() {
        let { project } = this.props
        return (
            <div style={{
                background: `url(${this.props.apodImg}) no-repeat center center fixed`, backgroundRepeat: "no-repeat", backgroundSize: "cover"
            }}>
                <Container className="project-container" align="center">
                    <h1>{project.title}</h1>
                    <button onClick={this.props.saveResources} className="save-button">Save</button>
                    <button onClick={this.props.toggleModal} className="present-button">Present Project</button>
                    <Modal
                        isOpen={this.props.modalOpen}
                        style={{ overlay: { backgroundColor: '#333' }, content: { color: "white", backgroundColor: "#111" } }}
                        onRequestClose={this.props.toggleModal}
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