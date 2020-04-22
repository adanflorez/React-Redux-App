import React, { useEffect } from "react";
import history from "../../utils/history";
import { useForm, Controller } from "react-hook-form";
import "./AuthForm.css";

import { Form, Input } from "semantic-ui-react";

import { signUp, resetError } from "../../state/auth/actions";
import { connect } from "react-redux";

import { useTranslation } from "react-i18next";

const SignUp = (props) => {
  const { t } = useTranslation();
  const { handleSubmit, errors, control, watch } = useForm();

  const onSubmit = (data) => {
    delete data.confirmpassword;
    props.signUp(data);
  };

  useEffect(() => {
    props.resetError();
  }, []);

  return (
    <>
      <div className="signup-container">
        <div className="form-container">
          <h2>{t("modules.signup.tittle", "Sign Up")}</h2>
          <div className="ui divider"></div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={
                <Form.Field
                  control={Input}
                  label={t("modules.signup.form.label.username", "Username")}
                  placeholder={t(
                    "modules.signup.form.label.username",
                    "Username"
                  )}
                  disabled={props.user.loading}
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
                  label={t("modules.signup.form.label.email", "Email")}
                  placeholder={t("modules.signup.form.label.email", "Email")}
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
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: t(
                    "form.validationmessages.invalidemail",
                    "Invalid Email"
                  ),
                },
              }}
              defaultValue=""
            />
            <Controller
              as={
                <Form.Field
                  control={Input}
                  label={t("modules.signup.form.label.password", "Password")}
                  placeholder={t(
                    "modules.signup.form.label.password",
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
                minLength: { value: 8, message: "Min length is 8" },
              }}
              defaultValue=""
            />

            <Controller
              as={
                <Form.Field
                  control={Input}
                  label={t(
                    "modules.signup.form.label.confirmpassword",
                    "Confrim Password"
                  )}
                  placeholder={t(
                    "modules.signup.form.label.confirmpassword",
                    "Confrim Password"
                  )}
                  disabled={props.user.loading}
                  type="password"
                  error={
                    errors.confirmpassword && {
                      content: errors.confirmpassword.message,
                      pointing: "below",
                    }
                  }
                />
              }
              name="confirmpassword"
              control={control}
              rules={{
                required: t(
                  "form.validationmessages.requiredfield",
                  "This field is required"
                ),
                minLength: { value: 8, message: "Min length is 8" },
                validate: (value) => {
                  if (value === watch("password")) return true;
                  else return "Password does not match";
                },
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
              {t("modules.signup.form.buttons.signup", "Sign Up")}
            </button>
            <button
              type="button"
              className="ui button"
              onClick={() => {
                history.push("/");
              }}
              disabled={props.user.loading}
            >
              {t("form.buttons.back", "Back")}
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
    signUp: (userData) => dispatch(signUp(userData)),
    resetError: () => dispatch(resetError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
