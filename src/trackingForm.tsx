import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import InputForm from "./components/inputForm";
import OutputForm from "./components/outputForm";

const TrackingForm = () => {

    const [shippingInfo, setShippingInfo] = useState();
    const [notFound, setNotFound] = useState(false);

    const updateShippingInfo = (data:any, notFoundData: boolean) => {
        console.log('updateShippingInfo');
        console.log(data);
        setShippingInfo(data);
        setNotFound(notFoundData);
    }

    return <>
        <Container style={{maxWidth: '800px'}}>
            <InputForm 
                updateShippingInfo = {updateShippingInfo}
            />
            <OutputForm
                data = {shippingInfo}
                notFound = {notFound}
            />
        </Container>
    </>
}

export default TrackingForm;