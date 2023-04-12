import React from 'react';
import { Col } from "react-bootstrap";
// auth
import { useAuth } from '../../context/AuthContext';

export default function Index() {

  // take username from auth
  const {currentUser} = useAuth();

  return (
    <Col md={9}>
      <div className="right-area px-4 py-3">
        <h2 className="mb-4">Hello { currentUser && currentUser.displayName }!</h2>
        <p>
          From your account dashboard, you can easily check and view your added places, videos and gallery images.
          Also can edit and delete them.
        </p>
      </div>
    </Col>
  )
}
