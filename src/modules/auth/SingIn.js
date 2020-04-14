import React from "react";
import { useForm, Controller } from "react-hook-form";
import "./AuthForm.css";

import { Form, Input } from "semantic-ui-react";

import { connect } from "react-redux";
import { logIn } from "../../state/auth/actions";

const SingIn = (props) => {
  const { handleSubmit, errors, control } = useForm();

  const params = new URLSearchParams(props.location.search);
  const comefrom = params.get("comefrom");

  const onSubmit = (data) => {
    props.logIn({ userData: data, comefrom: comefrom });
  };

  return (
    <>
      <div className="form-container">
        <h2>Sign In</h2>
        <div className="ui divider"></div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={
              <Form.Field
                control={Input}
                label="Username"
                placeholder="Username"
                disabled={props.user.username !== undefined}
                error={
                  errors.name && {
                    content: "This field is required",
                    pointing: "below",
                  }
                }
              />
            }
            name="username"
            control={control}
            rules={{
              required: true,
            }}
            defaultValue={props.user.username}
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
                    content:
                      (errors.password.type === "required" &&
                        "This field is required") ||
                      (errors.password.type === "minLength" &&
                        "Min length is 8"),
                    pointing: "below",
                  }
                }
              />
            }
            name="password"
            control={control}
            rules={{
              required: true,
              minLength: 8,
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
            Sing In
          </button>
        </Form>
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
    logIn: (userData) => dispatch(logIn(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingIn);
