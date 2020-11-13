import React from 'react'
import { Form, Button, Container, Image } from 'react-bootstrap'
import Logo from '../assets/img/stellar-logo.png'
import { useHistory, withRouter } from 'react-router'


function NewProject(props) {

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
            <Form onSubmit={(props.newProject)} >
                <Form.Group controlId="forTitle">
                    <Form.Label style={{color:"white"}}>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" required />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label style={{color:"white"}}>Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" required />
                </Form.Group>
                <Button variant="primary" type="submit" >Add Project</Button>
            </Form>
            <Button onClick={()=>routeChange('signup')} className="mt-4" variant="secondary" type="button">User Sign Up</Button>
        </Container>
        </div>
    )
}


export default withRouter(NewProject)