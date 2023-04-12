import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
// boostrap
import { Col, Container, Row, Form, Card } from "react-bootstrap";
// import authContext
import { useAuth } from '../context/AuthContext';

export default function Signup() {

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // call signup from authContext
  const { signup, currentUser } = useAuth();

  // usenavigate initialize
  let navigate = useNavigate();


  // submit signup form
  async function submitSignupForm(e) {
    e.preventDefault();

    // check match password
    if (password !== confirmPassword) {
      return setError("Password doesn't match!");
    }
    else {
      setError();
    }

    // submit to firebase
    try {
      setLoading(true);
      await signup(email, password, name);
      setLoading(false);
      navigate("/dashboard", { replace: true });
    }
    catch (err) {
      console.log(err);
      setError("Failed to create account");
      setLoading(false);
    }
  }


  return !currentUser ? (
    <Container>
      <Row className='justify-content-center'>
        <Col md={5}>
          <Card className='shadow-sm'>
            <Card.Body className='p-md-4'>
              <h4 className="text-center mb-4">Signup to Divine Tour and Travels</h4>
              <Form onSubmit={ submitSignupForm }>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control type="text" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Enter Name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter password" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder="Confirm password" required />
                </Form.Group>

                <h5 className="text-danger">{error}</h5>

                <button className={`btn bg-success text-white w-100 ${loading && "disabled"}`} type='submit'>Submit</button>
              </Form>

              <p className='mt-4'>
                <Link to="/login" className='text-primary'>Already have Account? <b>Login here</b></Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Navigate to="/dashboard" />
  )
}
