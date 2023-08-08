import * as React from 'react';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

const Todo = (props) => {
  const [list, setList] = React.useState({
    listName: '',
    isMandatory: false,
    listCategory: '',
    completed: false,
  });
  const [isEditClicked, setIsEditClicked] = React.useState(false);

  React.useEffect(() => {
    console.log('prop here==>', props);
    setList(props.list);
  }, []);

  React.useEffect(() => {
    props.onChangeList(list);
  }, [list.completed, list.isMandatory]);

  const onChangeText = (val, type) => {
    let tempList = { ...list };
    if (type === 'fromTextBox') {
      tempList.listName = val;
    } else if (type === 'fromComplete') {
      tempList.completed = !tempList.completed;
    } else {
      tempList.isMandatory = !tempList.isMandatory;
    }
    setList(tempList);
    // props.onChangeList(tempList, props.index);
    // console.log('onChangeText', val);
  };

  const onClickSaveBtn = () => {
    setIsEditClicked(!isEditClicked);
    props.onChangeList(list);
  };

  return (
    <Container className="todo-item">
      <Card>
        <Card.Title className="card-title">
          <Form.Check
            aria-label="option 1"
            checked={list.completed}
            onChange={(e) => onChangeText(e.target.value, 'fromComplete')}
          />
          {isEditClicked && (
            <textarea
              className="main-todo"
              value={list.listName}
              onChange={(e) => onChangeText(e.target.value, 'fromTextBox')}
            ></textarea>
          )}{' '}
          {!isEditClicked && <div>{list.listName}</div>}
          <Button
            variant={isEditClicked ? 'success' : 'warning'}
            onClick={() => {
              onClickSaveBtn();
            }}
          >
            {isEditClicked ? (
              <i className="material-icons" title="Add new Product">
                done
              </i>
            ) : (
              <i className="material-icons" title="Add new Product">
                edit
              </i>
            )}
          </Button>
        </Card.Title>
        <Card.Body className="card-body-todo">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Important"
            checked={list.isMandatory}
            onChange={(e) => onChangeText(e.target.value, 'fromCheckBox')}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Todo;
