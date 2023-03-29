import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const OutputForm = (props: any) => {

    console.log('output form');
    console.log(props.data);
    if (props.data && props.data.shipping_info[0] && ! props.data.shipping_info[0].tracking_carrier) {
        if (props.data.shipping_info[0].tracking_number) {
            if (props.data.shipping_info[0].tracking_number.indexOf('1Z') !== -1) {
                props.data.shipping_info[0].tracking_carrier = 'UPS';
            } else {
                props.data.shipping_info[0].tracking_carrier = 'FedEx';
            }
        }
    }

    return <>
    <br />
        <Row>
            <Card>
                { props.data &&
                    <Card.Header>Your Tracking Information:</Card.Header>
                }
                <ListGroup variant="flush">
                    { props.data && props.data.status &&
                        <ListGroup.Item><b>Order Status:</b> {props.data.status}</ListGroup.Item>
                    }
                    { props.data && props.data.shipping_info[0] && props.data.shipping_info[0].shipping_method &&
                        <ListGroup.Item><b>Shipping Method:</b> {props.data.shipping_info[0].shipping_method}</ListGroup.Item>
                    }
                    { props.data && props.data.shipping_info[0] && props.data.shipping_info[0].tracking_number &&
                        <ListGroup.Item><b>Tracking Number:</b> {props.data.shipping_info[0].tracking_number}</ListGroup.Item>
                    }
                    { props.data && props.data.shipping_info[0] && props.data.shipping_info[0].tracking_carrier &&
                        <ListGroup.Item><b>Carrier:</b> {props.data.shipping_info[0].tracking_carrier}</ListGroup.Item>
                    }
                    { props.data && props.data.shipping_info[0] && props.data.shipping_info[0].tracking_link &&
                        <ListGroup.Item><b>Tracking Link:</b> {props.data.shipping_info[0].tracking_link}</ListGroup.Item>
                    }
                    { props.notFound &&
                        <ListGroup.Item><b>Order was not found!</b>  Please check your order number and try again.</ListGroup.Item>
                    }
                </ListGroup>
            </Card>
        </Row>
    </>
}

export default OutputForm;