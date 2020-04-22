import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./AuthForm.css";

import { Form, Input, Message } from "semantic-ui-react";

import { connect } from "react-redux";
import {
  resetError,
  sendConfirmationEmail,
} from "../../state/auth/actions";
import { useTranslation } from "react-i18next";

import history from "../../utils/history";

const ResendConfirmationEmail = (props) => {
  const { t } = useTranslation();
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = (data) => {
    props.sendConfirmationEmail({ userData: data });
  };

  useEffect(() => {
    props.resetError();
  }, []);

  return (
    <>
      <div className="form-container">
        <h2>{t("modules.resendemail.tittle", "Resend confirmaion email")}</h2>
        <div className="ui divider"></div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={
              <Form.Field
                control={Input}
                label={t("modules.resendemail.form.label.email", "Email")}
                placeholder={t("modules.resendemail.form.label.email", "Email")}
                disabled={props.user.loading}
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
              required: t(
                "form.validationmessages.requiredfield",
                "This field is required"
              ),
            }}
            defaultValue=""
          />
          <Controller
            as={
              <Form.Field
                control={Input}
                label={t("modules.resendemail.form.label.password", "Password")}
                placeholder={t(
                  "modules.resendemail.form.label.password",
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
              required: t(
                "form.validationmessages.requiredfield",
                "This field is required"
              ),
              minLength: { value: 8, message: "Minlength is 8" },
            }}
            defaultValue=""
          />
          <div style={{ textAlign: "center" }}>
            <button
              className={`ui button positive ${
                props.user.loading ? "loading" : ""
              }`}
              style={{ marginTop: "6px" }}
              type="submit"
              disabled={props.user.loading}
            >
              {t("modules.resendemail.form.buttons.sendemail", "Send Email")}
            </button>
            <button
              type="button"
              className="ui button"
              onClick={() => {
                history.push("/dashboard/signin");
              }}
              disabled={props.user.loading}
            >
              {t("form.buttons.back", "Back")}
            </button>
          </div>
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
    sendConfirmationEmail: (userData) =>
      dispatch(sendConfirmationEmail(userData)),
    resetError: () => dispatch(resetError()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResendConfirmationEmail);
