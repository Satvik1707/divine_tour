import React from 'react';
// bootstarp
import { Container, Row } from "react-bootstrap";

// components
import LeftSidebar from './LeftSidebar';
import Index from './dashboard/Index';

export default function Dashboard() {
  return (
    <Container>
      <Row>
        {/* left side */}
        <LeftSidebar />

        {/* right side */}
        <Index />
      </Row>
    </Container>
  )
}
