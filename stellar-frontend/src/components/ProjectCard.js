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
            this.props.deleteResource(this.props.resource.id)
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
                        <div>
                            <form onSubmit={(e) => this.handleCommit('edit', e)}>
                                <input name="content" type='text' placeholder={resource.content}></input>
                                <input type='submit'></input>
                            </form>
                            <button onClick={() => this.handleCommit('delete')}>Delete</button>
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
