import React from "react";
import "./AuthForm.css";

import { Form, Message, Input } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import history from "../../utils/history";

import { connect } from "react-redux";

import { sendPassEmail } from "../../state/auth/actions";

const RestorePassword = (props) => {
  const { t } = useTranslation();
  const { control, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    props.sendPassEmail(data.email);
  };

  return (
    <>
      <div className="form-container">
        <h2>{t("modules.restorepassword.tittle", "Restore Password")}</h2>
        <div className="ui divider"></div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={
              <Form.Field
                control={Input}
                label={t("modules.restorepassword.form.label.email", "Email")}
                placeholder={t(
                  "modules.restorepassword.form.label.email",
                  "Email"
                )}
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

          <button
            className={`ui button positive ${
              props.user.loading ? "loading" : ""
            }`}
            type="submit"
            disabled={props.user.loading}
          >
            {t("modules.restorepassword.form.buttons.findemail", "Sdign Up")}
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
    sendPassEmail: (email) => dispatch(sendPassEmail(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestorePassword);
