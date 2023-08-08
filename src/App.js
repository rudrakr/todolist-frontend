import * as React from 'react';
import './style.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Register from './screens/register';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import Login from './screens/login';
import TodoList from './screens/todoList';
import CustomContext from './CustomContext';
import { reducer } from './reducer';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Homepage from './screens/homepage';

export default function App() {
  const [userState, usersDispatch] = React.useReducer(reducer, []);
  const providerState = {
    userState,
    usersDispatch,
  };
  // const navigate = useNavigate();
  console.log(providerState);

  React.useEffect(() => {
    console.log('providerState.userState', providerState.userState);
  }, [providerState]);
  return (
    <CustomContext.Provider value={providerState}>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <Link to="/">
                <img
                  alt=""
                  src="data:image/jpeg;base64,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"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />
                <span className="nav-head">To Do List App</span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {providerState.userState.length == 0 ? (
                <Nav>
                  {/* <Navbar.Text className="pr-3"> */}
                  <Nav.Link>
                    <Link to="/login">Login</Link>
                  </Nav.Link>
                  &nbsp;&nbsp;&nbsp;
                  <Nav.Link>
                    <Link to="/register">Register</Link>
                  </Nav.Link>
                  {/* </Navbar.Text> */}
                </Nav>
              ) : (
                <Nav>
                  {/* <Navbar.Text className="pr-3"> */}
                  <Nav.Link href="/">Logout</Nav.Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/todolist"
              element={<TodoList value={providerState} />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </CustomContext.Provider>
  );
}
