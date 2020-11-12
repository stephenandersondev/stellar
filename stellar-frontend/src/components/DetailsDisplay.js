import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";

const DetailsDisplay = ({ item, exitDisplay, visible, createResource }) => {
    console.log(item);
    if (!(Array.isArray(item))) {
        return (
            <div
                className="details-display"
                style={{ visibility: visible ? "visible" : "hidden" }}
            >
                <h1>{item.data[0]?.title}</h1>
                <h5>Date: {item.data[0]?.date_created}</h5>
                <p>{item.data[0]?.description}</p>
                <button onClick={() => exitDisplay()}>Exit</button>
                <Container>
                    <Form onSubmit={(e) => createResource(item, e)}>
                        <Form.Group controlId="textArea">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                name="content"
                                type="textarea"
                                placeholder="Slide Content..."
                                required
                            />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Save to Project
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
    else {
        return null
    }
};

export default DetailsDisplay;
