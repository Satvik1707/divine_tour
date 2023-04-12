import React,{ useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
// bootstrap
import { Col, Container, Row, Form, Card } from "react-bootstrap";
import { useAuth } from '../context/AuthContext';

export default function Login() {

  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // useNavigate
  const navigate = useNavigate();



  // define context value
  const { login, currentUser } = useAuth();


  // submit login form
  async function loginSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(email, password);
      setLoading(false);
      navigate("/dashboard", {replace: true});
    }
    catch (err) {
      console.log(err);
      setError("Failed to login");
      setLoading(false);
    }
  }

  return !currentUser ? (
    <Container>
      <Row className='justify-content-center'>
        <Col md={5}>
          <Card className='shadow-sm'>
            <Card.Body className='p-md-4'>
              <h4 className="text-center mb-4">Login to Divine Tour and Travels</h4>
              <Form onSubmit={loginSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@gmail.com" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="123456" required />
                </Form.Group>

                <h5 className="text-danger">{error}</h5>

                <button className={`btn bg-success w-100 ${loading ? "disabled": ''}`} type='submit'>Submit</button>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Navigate to="/dashboard" />
  )
}
