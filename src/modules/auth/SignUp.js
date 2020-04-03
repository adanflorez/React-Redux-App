import React from "react";
import history from "../../utils/history";
import { useForm, Controller } from "react-hook-form";
import "./SignUpStyle.css";


import { Form, Input, Button } from "semantic-ui-react";

import { signUp } from '../../state/auth/actions';
import { connect} from 'react-redux';

const SignUp = props => {
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = data => {
    props.signUp(data);
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <h2>Sign Up</h2>
        <div className="ui divider"></div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={
              <Form.Field
                control={Input}
                label="Name"
                placeholder="Name"
                error={ errors.name && {
                  content: "This field is required",
                  pointing: "below"
                }}
              />
            }
            name="username"
            control={control}
            rules={{
              required: true
            }}
            defaultValue=""
          />
          {/* <Controller
            as={
              <Form.Field
                control={Input}
                label="Email"
                placeholder="Email"
                error={{
                  content: "Please enter a valid email address",
                  pointing: "below"
                }}
              />
            }
            name="email"
            control={control}
            rules={{
              pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            }}
            defaultValue=""
          /> */}
          <Controller
            as={
              <Form.Field
                control={Input}
                label="Password"
                placeholder="Password"
                type="password"
                error={ errors.password && {
                  content:  errors.password.type ==="required" && "This field is required" ||
                  errors.password.type ==="minLength" && "Min length is 8",
                  pointing: "below"
                }}
              />
            }
            name="password"
            control={control}
            rules={{
              required: true,
              minLength:8
            }}
            defaultValue=""
          />
          <button className="ui button positive" type="submit">
              Sing Up
            </button>
            <button
              type="button"
              className="ui button"
              onClick={() => {
                history.push("/");
              }}
            >
              Back
            </button>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = state =>{
  return{
    state:state
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    signUp:userData=>{dispatch(signUp(userData))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
