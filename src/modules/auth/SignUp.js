import React from "react";
import history from "../../utils/history";
import { useForm, Controller } from "react-hook-form";
import "./AuthForm.css";

import { Form, Input } from "semantic-ui-react";

import { signUp } from "../../state/auth/actions";
import { connect } from "react-redux";

const SignUp = (props) => {
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = (data) => {
    props.signUp(data);
  };

  return (
    <>
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
                  error={
                    errors.username && {
                      content: errors.username.message,
                      pointing: "below",
                    }
                  }
                />
              }
              name="username"
              control={control}
              rules={{
                required: "This field is required",
              }}
              defaultValue=""
            />
            <Controller
              as={
                <Form.Field
                  control={Input}
                  label="Email"
                  placeholder="Email"
                  error={
                    errors.email && {
                      content: errors.email.message,
                      pointing: "below",
                    }
                  }
                />
              }
              name="email"
              control={control}
              rules={{
                required: "This field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address",
                },
              }}
              defaultValue=""
            />

            <Controller
              as={
                <Form.Field
                  control={Input}
                  label="Password"
                  placeholder="Password"
                  type="password"
                  error={
                    errors.password && {
                      content: errors.password.message,
                      pointing: "below",
                    }
                  }
                />
              }
              name="password"
              control={control}
              rules={{
                required: "This field is required",
                minLength: { value: 8, message: "Min length is 8" },
              }}
              defaultValue=""
            />

            <button
              className={`ui button positive ${
                props.user.loading ? "loading" : ""
              }`}
              type="submit"
              disabled={props.user.loading}
            >
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (userData) => {
      dispatch(signUp(userData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
