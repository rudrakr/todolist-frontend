import * as React from 'react';
import '../style.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { useCustomContext } from '../CustomContext';

export default function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const { userState, usersDispatch } = useCustomContext();

  const handleFormElements = (elType, val) => {
    switch (elType) {
      case 'name':
        setName(val);
        break;
      case 'email':
        setEmail(val);
        break;
      case 'password':
        setPassword(val);
    }
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();
    if(!name || !email || !password){
      alert("name or email or password cannot be empty");
      return;
  }
    const response = fetch(
      'https://todolistbackend-rudy.onrender.com/user/register',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      }
    );
    response
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .then((data) => {
        console.log('data=', data);
        alert(data.message);
        if (data.message === 'email ID already present') {
          setEmail('');
          setName('');
          setPassword('');
        } else if (data.message === 'User Successfully Registered') {
          usersDispatch({
            type: 'ID',
            payload: { id: data.id, name: data.name },
          });
          usersDispatch({
            type: 'LOCAL',
            payload: false,
          });
          navigate('/todolist');
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <Container className="login-register">
      <h1>Please Sign Up</h1>
      <Form className="mt-4">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => {
              handleFormElements('name', e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              handleFormElements('email', e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              handleFormElements('password', e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={onClickSubmit}>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}
