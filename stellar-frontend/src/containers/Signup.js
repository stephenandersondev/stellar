import React from 'react'
import { Form, Button, Container, Image } from 'react-bootstrap'
import Logo from '../assets/img/stellar-logo.png'
import { useHistory, withRouter } from 'react-router'


function Signup(props) {
    const history = useHistory();

    const routeChange = (newPath) => {
        let path = `/${newPath}`;
        history.push(path);
    }
    return (
    
        <Container className="center">
            <Image src={Logo} alt="Logo" height="250" width="auto" />
            <Form onSubmit={(props.signup)}>
                <Form.Group controlId="forUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Choose a username" />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Choose a Password" />
                </Form.Group>
                <Form.Group controlId="forProject">
                    <Form.Label>Project</Form.Label>
                    <Form.Control as="select" multiple>
                    {props.projects.map(project => <option value={project.id}>{project.title} - {project.description}</option>)}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Sign up</Button>
            </Form>
            <Button onClick={() => routeChange('login')} className="mt-4" variant="secondary" type="button">Existing User Login</Button>
            <Button onClick={() => routeChange('newproject')} className="mt-4" variant="secondary" type="button">New Project</Button>
        </Container>
    )
}


export default withRouter(Signup)