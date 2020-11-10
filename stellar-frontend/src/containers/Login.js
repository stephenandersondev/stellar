import React from 'react'
import { Form, Button, Container, Image } from 'react-bootstrap'
import Logo from '../assets/img/stellar-logo.png'


export default class Login extends React.Component {
    render() {
        return (
            <Container className="center">
             <Image src={Logo} alt="Logo" height="250" width="auto" />
                <Form onSubmit={(this.props.login)}>
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
                <Button className="mt-4" variant="secondary" type="button">Sign Up</Button>
            </Container>
        )
    }
}