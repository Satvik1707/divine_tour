import React from 'react';

// bootstarp
import { Container, Row } from "react-bootstrap";

// components
import LeftSidebar from './LeftSidebar';
import Index from './places/Index';

export default function Places({ places, setPlaces }) {
  return (
    <Container>
      <Row>
        {/* left side */}
        <LeftSidebar />

        {/* right side */}
        <Index places={ places } setPlaces={ setPlaces } />
      </Row>
    </Container>
  )
}
