import React from 'react';
import {Container} from 'react-bootstrap';

export default function Footer() {
  return (
    <>
      {/* footer bottom start */}
      <div className="footer-bottom py-3">
        <Container>
          <p className="text-center text-white">&copy; { new Date().getFullYear() } - All rights reserved by Divine Tour and Travels.</p>
        </Container>
      </div>
    </>
  )
}
