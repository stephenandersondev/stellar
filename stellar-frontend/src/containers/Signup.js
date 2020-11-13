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
        <div className='home-screen' style={{
            background: `url(${props.apodImg}) no-repeat center center
        fixed`, backgroundRepeat:"no-repeat", backgroundSize:"cover", height:"100vh"}}>
        <Container className="sign-in-container" align="center">
            <Image src={Logo} alt="Logo" height="250" width="auto" />
            <Form onSubmit={(props.signup)}>
                <Form.Group controlId="forUsername">
                    <Form.Label style={{color:"white"}}>Username</Form.Label>
                    <Form.Control type="text" placeholder="Choose a username" required />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label style={{color:"white"}}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Choose a Password" required/>
                </Form.Group>
                <Form.Group controlId="forProject">
                    <Form.Label style={{color:"white"}}>Project</Form.Label>
                    <Form.Control as="select" multiple required>
                    {props.projects.map(project => <option value={project.id}>{project.title} - {project.description}</option>)}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Sign up</Button>
            </Form>
            <Button onClick={() => routeChange('login')} className="mt-4" variant="secondary" type="button">Existing User Login</Button>
            <>
            <br></br>
            </>
            <Button onClick={() => routeChange('newproject')} className="mt-4" variant="secondary" type="button">New Project</Button>
        </Container>
        </div>
    )
}


export default withRouter(Signup)