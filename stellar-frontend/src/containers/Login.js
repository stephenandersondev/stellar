import React from 'react'
import { Form, Button, Container, Image } from 'react-bootstrap'
import Logo from '../assets/img/stellar-logo.png'
import { useHistory, withRouter } from 'react-router'

function Login(props) {

    const history = useHistory();

    const routeChange = () => {
        let path = `/signup`;
        console.log(path)
        history.push(path);
    }
    console.log(history)
    return (
        <Container className="center">
            <Image src={Logo} alt="Logo" height="250" width="auto" />
            <Form onSubmit={(props.login)}>
                <Form.Group controlId="forUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
            </Form>
                <Button onClick={routeChange} className="mt-4" variant="secondary" type="button">Sign Up</Button>
        </Container>
    )
}
export default withRouter(Login)