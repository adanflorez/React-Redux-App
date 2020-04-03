import React from "react";
import { Popup } from "semantic-ui-react";
import { useForm } from "react-hook-form";

const LoginForm = props => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    props.onSubmitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Popup
        content="Este campo es obligatorio"
        open={errors.user}
        trigger={
          <div className="ui input" style={{ paddingRight: 10 }}>
            <input
              type="text"
              name="username"
              placeholder="User"
              style={{ width: 170 }}
              ref={register({ required: true })}
            />
          </div>
        }
      />
      <Popup
        content="Este campo es obligatorio"
        open={errors.password}
        trigger={
          <div className="ui input">
            <input
              type="password"
              name="password"
              placeholder="Password"
              style={{ width: 170, marginRight: 20 }}
              ref={register({ required: true })}
            />
          </div>
        }
      />
      <button
        className={`ui button primary ${props.loading ? "loading" : ""}`}
        style={{
          float: "right"
        }}
        type="submit"
        disabled={props.loading}
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
