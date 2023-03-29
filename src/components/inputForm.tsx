import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Spinner from 'react-bootstrap/Spinner';

const InputForm = (props: any) => {

    const [orderId, setOrderId] = useState();
    const [awaitingResponse, setAwaitingResponse] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const handleFormChange = (event: any) => {
        setOrderId(event.target.value);
    }

    let origin = `${process.env.REACT_APP_API}/feed/order/${orderId}/${process.env.REACT_APP_OVERWRITE_ENV}`
    
    const storefrontCall = async() => {
        
        let resource = origin;
        let init: RequestInit = {
            method: 'GET',
            headers: {
                "Accept": 'application/json',
            },
        }
        setAwaitingResponse(true);
        setNotFound(false);
        const response = await fetch(resource, init);
        const data = await response.json();
        if (response.status === 400 || response.status === 404) {
            setNotFound(true);
            props.updateShippingInfo(data, true);
        } else {
            props.updateShippingInfo(data, false);
        }
        
        setAwaitingResponse(false);
    }

    return <>
        <Row>
            <Col>
                <Form.Group className="mb-3" >
                        <Form.Control
                            type="text"
                            name="orderId"
                            placeholder="Order Number"
                            value={orderId}
                            onChange={(e) => handleFormChange(e)}
                            required
                        />
                </Form.Group>                    
            </Col>
            <Col>
                <br />
                <Button variant="outline-primary" onClick={storefrontCall}>
                    { !awaitingResponse && <>Check Status</> }
                    { awaitingResponse && 
                        <>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                />
                            Loading...
                        </>
                    }
                </Button>
            </Col>
        </Row>
    </>
}

export default InputForm;