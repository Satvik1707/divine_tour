import React from 'react';

// bootstarp
import { Container, Row } from "react-bootstrap";

// components
import LeftSidebar from './LeftSidebar';
import Index from './hospitals/Index';

export default function Hospitals({ hospitals,setHospitals }) {
  return (
    <Container>
      <Row>
        {/* left side */}
        <LeftSidebar />

        {/* right side */}
        <Index hospitals={ hospitals } setHospitals={ setHospitals } />
      </Row>
    </Container>
  )
}
