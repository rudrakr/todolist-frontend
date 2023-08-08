import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomContext } from '../CustomContext';

const HomePage = () => {
  const { userState, usersDispatch } = useCustomContext();
  const onClickWithoutSigin = () => {
    usersDispatch({
      type: 'LOCAL',
      payload: true,
    });
    navigate('/todolist');
  };
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div>Organise your work-life and personal-life</div>
      <div>
        Become focused and composed and never forget anything in life with the
        best todo list/ task manager
      </div>
      <div className="home-btn-wrapper">
        <button
          onClick={() => {
            navigate('/register');
          }}
          className="sign-up-btn"
        >
          Sign Up now
        </button>
        <button onClick={onClickWithoutSigin} className="sign-up-btn-wt-sign">
          Continue, Without Signing
        </button>
      </div>
    </div>
  );
};

export default HomePage;
