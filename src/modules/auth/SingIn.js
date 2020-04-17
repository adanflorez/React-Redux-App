import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./AuthForm.css";

import { Form, Input, Message } from "semantic-ui-react";

import { connect } from "react-redux";
import { logIn, resetError } from "../../state/auth/actions";
import { useTranslation } from "react-i18next";

const SingIn = (props) => {
  const { t } = useTranslation();
  const { handleSubmit, errors, control } = useForm();

  const params = new URLSearchParams(props.location.search);
  const comefrom = params.get("comefrom");

  const onSubmit = (data) => {
    props.logIn({ userData: data, comefrom: comefrom });
  };

  useEffect(() => {
    props.resetError();
  }, []);

  let username = props.user.username ? props.user.username : "";

  return (
    <>
      <div className="form-container">
        <h2>{t("modules.signin.tittle", "Sign In")}</h2>
        <div className="ui divider"></div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={
              <Form.Field
                control={Input}
                label={t(
                  "modules.signin.form.label.username-email",
                  "Username or Email"
                )}
                placeholder={t(
                  "modules.signin.form.label.username-email",
                  "Username or Email"
                )}
                disabled={username !== "" || props.user.loading}
                error={
                  errors.name && {
                    content: errors.name.message,
                    pointing: "below",
                  }
                }
              />
            }
            name="username"
            control={control}
            rules={{
              required: t("form.validationmessages.requiredfield", "This field is required"),
            }}
            defaultValue={username}
          />
          <Controller
            as={
              <Form.Field
                control={Input}
                label={t("modules.signin.form.label.password", "Password")}
                placeholder={t(
                  "modules.signin.form.label.password",
                  "Password"
                )}
                disabled={props.user.loading}
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
              required: t("form.validationmessages.requiredfield", "This field is required"),
              minLength: { value: 8, message: "Minlength is 8" },
            }}
            defaultValue=""
          />

          {props.user.authError && (
            <Message negative>
              <Message.Header>{props.user.authError}</Message.Header>
            </Message>
          )}

          <button
            className={`ui button positive ${
              props.user.loading ? "loading" : ""
            }`}
            type="submit"
            disabled={props.user.loading}
          >
            {t("modules.signin.form.buttons.signin", "Sign In")}
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
    resetError: () => dispatch(resetError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingIn);
