import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";

const DetailsDisplay = ({ item, exitDisplay, visible, createResource, addedItem, deleteResource }) => {

    if (!(Array.isArray(item))) {
        return (
            <div
                onch
                className="details-display"
                style={{ visibility: visible ? "visible" : "hidden" }}
            >
                <h1>{item.data[0]?.title}</h1>
                <h5>Date: {item.data[0]?.date_created}</h5>
                <p>{item.data[0]?.description}</p>
                <button className="exit-display-button" onClick={() => exitDisplay()}>Exit</button>
                <Container>
                    <Form onSubmit={(e) => (addedItem) ? deleteResource(addedItem.id, e) : createResource(item, e)}>
                        <Form.Group controlId="textArea">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                name="content"
                                type="textarea"
                                placeholder={addedItem ? `${addedItem.content}` : "Slide Content..."}
                                required={addedItem ? false : true}
                                readOnly={addedItem ? true : false}
                            />
                        </Form.Group>
                        {!(addedItem) ?
                            <Button className="save-project-btn" variant="success" type="submit">
                            Save to Project
                        </Button>
                            :
                            <Button variant="danger" type="submit">
                                Remove from Project
                        </Button>}

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
