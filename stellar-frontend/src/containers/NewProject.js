import React from 'react'
import { Form, Button, Container, Image } from 'react-bootstrap'
import Logo from '../assets/img/stellar-logo.png'
import { useHistory, withRouter } from 'react-router'


function NewProject(props) {
    const history = useHistory();

    const routeChange = () => {
        let path = `/signup`;
        history.push(path);
    }
    return (
    
        <Container className="center">
            <Image src={Logo} alt="Logo" height="250" width="auto" />
            <Form onSubmit={(props.newproject)}>
                <Form.Group controlId="forTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" />
                </Form.Group>
                <Button variant="primary" type="submit">Add Project</Button>
            </Form>
            <Button onClick={routeChange} className="mt-4" variant="secondary" type="button">User Sign Up</Button>
        </Container>
    )
}


export default withRouter(NewProject)