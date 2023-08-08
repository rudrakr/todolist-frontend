import * as React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useCustomContext } from '../CustomContext';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { userState, usersDispatch } = useCustomContext();

    const navigate = useNavigate();

    const handleFormElements = (elType, val) => {
        switch (elType) {
            case 'email':
                setEmail(val);
                break;
            case 'password':
                setPassword(val);
        }
    };
    const onClickSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password){
            alert("email or password cannot be empty");
            return;
        }
        const response = fetch(
            'https://todolistbackend-rudy.onrender.com/user/login',
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
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
                if (data.message === 'Login Successfull') {
                    usersDispatch({
                        type: 'ID',
                        payload: { id: data.id, name: data.name },
                    });
                    usersDispatch({
                        type: 'LOCAL',
                        payload: false,
                    });
                    navigate('/todolist');
                } else {
                    alert('Please Register');
                    navigate('/register');
                }
            })
            .catch((e) => console.error(e));
    };
    return (
        <Container className="login-register">
            <h1>Please Sign In</h1>
            <Form className="mt-4">
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
                    Login
                </Button>
            </Form>
        </Container>
    );
};
export default Login;
