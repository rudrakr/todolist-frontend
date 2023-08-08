import * as React from 'react';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Todo from '../components/todo';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';
import { useState, CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';

const TodoList = (props) => {
  const [newListName, setNewListName] = React.useState('');
  const [tempLists, setNewTempLists] = React.useState([]);
  const [lists, setLists] = React.useState([]);
  const [completedLists, setCompletedLists] = React.useState([]);
  const [mandatoryLists, setMandatoryLists] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const override = {
    display: 'flex',
    zIndex: '10',
    borderColor: 'black',
    position: 'absolute',
    top: '28%',
    left: '30%',
  };

  React.useEffect(() => {
    console.log('props', props);
    if (props.value.userState.local) {
      if (localStorage.getItem('list')) {
        setLists(JSON.parse(localStorage.getItem('list')));
        setCompletedLists(
          JSON.parse(localStorage.getItem('list')).filter(
            (item) => item.completed
          )
        );
        setMandatoryLists(
          JSON.parse(localStorage.getItem('list')).filter(
            (item) => item.isMandatory
          )
        );
      }
      console.log('from-Local');
    } else {
      setLoading(true);
      const response = fetch(
        'https://todolistbackend-rudy.onrender.com/todo/' +
          props.value.userState.details.id,
        {
          method: 'get',
        }
      );
      response
        .then((res) => {
          console.log(res.status);
          return res.json();
        })
        .then((data) => {
          console.log('data=', data);
          if (data) {
            if (data && data.length == 0 && localStorage.getItem('list')) {
              submitLists(JSON.parse(localStorage.getItem('list')));
              localStorage.removeItem('list');
            }
            setLoading(false);
            if (data.lists) {
              setLists(data.lists);
              setCompletedLists(data.lists.filter((item) => item.completed));
              setMandatoryLists(data.lists.filter((item) => item.isMandatory));
            }
          }
        })
        .catch((e) => console.error(e));
    }
  }, []);

  const submitLists = (listToSend) => {
    if (props.value.userState.local) {
      localStorage.setItem('list', JSON.stringify(listToSend));
      setLists(JSON.parse(localStorage.getItem('list')));
      setCompletedLists(
        JSON.parse(localStorage.getItem('list')).filter(
          (item) => item.completed
        )
      );
      setMandatoryLists(
        JSON.parse(localStorage.getItem('list')).filter(
          (item) => item.isMandatory
        )
      );
    } else {
      setLoading(true);
      const response = fetch(
        'https://todolistbackend-rudy.onrender.com/todo/create',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: props.value.userState.details.id,
            // id: '63c667ee3952fd3113b41e92',
            lists: listToSend,
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
          setLoading(false);
          setLists(data.lists);
          setCompletedLists(data.lists.filter((item) => item.completed));
          setMandatoryLists(data.lists.filter((item) => item.isMandatory));
        })
        .catch((e) => console.error(e));
    }
  };

  function objectsAreSame(x, y) {
    var objectsAreSame = true;
    for (var propertyName in x) {
      if (x[propertyName] !== y[propertyName]) {
        objectsAreSame = false;
        break;
      }
    }
    return objectsAreSame;
  }
  const onChangeTodo = (listValue) => {
    console.log('value', listValue);
    if (!listValue.listName) return;
    let a = [...lists];
    // a[index] = listValue;
    const indexToChange = a.findIndex(
      (item) => item.listNumber === listValue.listNumber
    );
    a[indexToChange] = listValue;
    // setLists(a);
    if (!objectsAreSame(lists[indexToChange], listValue)) submitLists(a);
  };
  const onClickAdd = () => {
    // lists.unshift({ listName: newListName, listCategory: '' })
    // let a = [...lists];
    let newObj = {
      listNumber: 1,
      listName: newListName,
      isMandatory: false,
      completed: false,
    };
    let temp = [];
    if (lists && lists.length > 0) {
      let a = [...lists];
      a.map((item) => (item.listNumber += 1));
      // setLists([...lists, newObj]);
      // setLists([newObj, ...a]);
      temp = [newObj, ...a];
    } else {
      temp = [newObj];
    }
    // console.log('lists while adding', lists);
    setNewListName('');
    submitLists(temp);
  };
  return (
    <Container>
      {/* <h1>This is todolist Page and id = {props.value.userState.id}</h1> */}
      <div className="todolist-heading">To Do List</div>
      <div>Hi. Please find your list</div>
      {props.value.userState.local && (
        <div className="local-msg">
          <strong>
            Please <Link to="/register">sign-Up</Link> to access your todo list
            from anywhere
          </strong>
        </div>
      )}
      <div className="enter-todo">
        <Form.Control
          type="text"
          value={newListName}
          onChange={(e) => {
            setNewListName(e.target.value);
          }}
          placeholder="Enter a task.."
        />
        <Button onClick={onClickAdd} variant="primary">
          Add
        </Button>
      </div>
      {lists.length > 0 ? (
        <Tabs
          defaultActiveKey="all-tasks"
          id="uncontrolled-tab-example"
          className="mb-3"
          unmountOnExit
        >
          <Tab
            eventKey="all-tasks"
            title="All"
            className={loading ? 'tab-content-loading' : null}
          >
            {lists &&
              lists.map((list, i) => {
                return (
                  <Todo
                    key={list.listName + i}
                    list={list}
                    onChangeList={onChangeTodo}
                  />
                );
              })}
            {loading && (
              <ClipLoader
                color={'#ffffff'}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
          </Tab>
          <Tab
            eventKey="completed"
            title="Completed"
            className={loading ? 'tab-content-loading' : null}
          >
            {completedLists &&
              completedLists.map((list, i) => {
                return (
                  <Todo
                    key={list.listName + i}
                    list={list}
                    onChangeList={onChangeTodo}
                  />
                );
              })}
            {loading && (
              <ClipLoader
                color={'#ffffff'}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
          </Tab>
          <Tab
            eventKey="important"
            title="Important"
            className={loading ? 'tab-content-loading' : null}
          >
            {mandatoryLists &&
              mandatoryLists.map((list, i) => {
                return (
                  <Todo
                    key={list.listName + i}
                    list={list}
                    onChangeList={onChangeTodo}
                  />
                );
              })}
            {loading && (
              <ClipLoader
                color={'#ffffff'}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
          </Tab>
        </Tabs>
      ) : (
        <div className="">
          <Toast className="toast-width-100">
            <Toast.Header>
              <h5 className="me-auto">Message</h5>
              <div>You Dont have any list</div>
            </Toast.Header>
            <Toast.Body>
              Hi, You do not have any todo list created. Please create some to
              get organised.
            </Toast.Body>
          </Toast>
        </div>
      )}
      <div>
        {/* {lists.map((list, i) => {
          return <Todo list={list} index={i} onChangeList={onChangeTodo} />;
        })} */}
        {/* <Button onClick={onClickAdd} variant="primary">
          Add more
        </Button> */}
      </div>
    </Container>
  );
};

export default TodoList;
