import React from 'react'
import { Form, Button, Container, Image } from 'react-bootstrap'
import Logo from '../assets/img/stellar-logo.png'
import { useHistory, withRouter } from 'react-router'

function Login(props) {

    const history = useHistory();

    const routeChange = () => {
        let path = `/signup`;
        history.push(path);
    }

    return (
        // <div style={{ justifyContent:"center", alignItems:"center"}}>
        <Container align="center" background={{background: `url(${props.apodImg}) no-repeat center center
        fixed`}}>
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
        // </div>
    )
}
export default withRouter(Login)