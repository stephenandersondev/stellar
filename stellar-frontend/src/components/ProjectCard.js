import React from 'react'


export default class ProjectCard extends React.Component {

    constructor() {
        super();
        this.state = {
            readOnly: true
        }
    }

    editContent = () => {
        this.setState({ readOnly: false })
    }

    handleCommit = (action, e) => {
        if (action === "delete") {
            this.props.deleteResource(this.props.resource.id,e)
        } else if (action === "edit") {
            this.props.editResource(e,this.props.resource.id)
        }
        this.setState({
            readOnly: true
        })
    }

    render() {
        let { resource, resources, reorder } = this.props

        return (
            <div className="pcard">
                <img className="pcard-img" src={resource.url} />
                <div>
                    {this.state.readOnly ?
                        <div>
                            <p className="pcard-text">{resource.content}</p>
                            <button className="pcard-button" onClick={this.editContent}>Edit Content</button>
                        </div>
                        :
                        <div className="edit-form">
                            <form onSubmit={(e) => this.handleCommit('edit', e)}>
                                <input size="80" name="content" type='text' placeholder={resource.content}></input>
                                <input style={{backgroundColor:"orange", color:"white"}} type='submit'></input>
                            </form>
                            <button className="delete-button" onClick={(e) => this.handleCommit('delete', e)}>Delete</button>
                        </div>
                    }
                </div>
                <select onChange={(e) => reorder(resource, e)} value={resource.ord_num}>
                    {resources.map((resource, index) => <option value={index + 1} >{index + 1}</option>)}
                </select>
            </div>
        )
    }
}
