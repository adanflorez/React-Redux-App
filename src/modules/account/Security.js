import React, { useState } from "react";
import { Divider, Accordion, Icon, Form, Input } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Security = (props) => {
  const { t } = useTranslation();

  const { handleSubmit, errors, control, watch } = useForm();
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  const onSubmit = (data) => {
    props.ChangePassword(data);
  };

  return (
    <>
      <h3>{t("modules.account.security.tittle", "Security")}</h3>
      <Divider />
      <Accordion styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          {t("modules.account.security.password.tittle", "Password")}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={
                <Form.Field
                  control={Input}
                  label={t(
                    "modules.account.security.password.form.label.currentpassword",
                    "Current Password"
                  )}
                  placeholder={t(
                    "modules.account.security.password.form.label.currentpassword",
                    "Current Password"
                  )}
                  type="password"
                  disabled={props.account.loading}
                  error={
                    errors.currentpassword && {
                      content: errors.currentpassword.message,
                      pointing: "below",
                    }
                  }
                />
              }
              name="currentpassword"
              control={control}
              rules={{
                required:  t("form.validationmessages.requiredfield", "This field is required"),
                minLength: { value: 8, message: "Min length is 8" },
              }}
              defaultValue=""
            />
            <Controller
              as={
                <Form.Field
                  control={Input}
                  label={t(
                    "modules.account.security.password.form.label.newpassword",
                    "New Password"
                  )}
                  placeholder={t(
                    "modules.account.security.password.form.label.newpassword",
                    "New Password"
                  )}
                  type="password"
                  disabled={props.account.loading}
                  error={
                    errors.newpassword && {
                      content: errors.newpassword.message,
                      pointing: "below",
                    }
                  }
                />
              }
              name="newpassword"
              control={control}
              rules={{
                required:  t("form.validationmessages.requiredfield", "This field is required"),
                minLength: { value: 8, message: "Min length is 8" },
              }}
              defaultValue=""
            />
            <Controller
              as={
                <Form.Field
                  control={Input}
                  label={t(
                    "modules.account.security.password.form.label.confirm-newpassword",
                    "Confirm New Password"
                  )}
                  placeholder={t(
                    "modules.account.security.password.form.label.confirm-newpassword",
                    "Confirm New Password"
                  )}
                  type="password"
                  disabled={props.account.loading}
                  error={
                    errors.confirmnewpassword && {
                      content: errors.confirmnewpassword.message,
                      pointing: "below",
                    }
                  }
                />
              }
              name="confirmnewpassword"
              control={control}
              rules={{
                required: t("form.validationmessages.requiredfield", "This field is required"),
                minLength: { value: 8, message: "Min length is 8" },
                validate: (value) => {
                  if (value === watch("newpassword")) return true;
                  else return "Password does not match";
                },
              }}
              defaultValue=""
            />
            <button
              className={`ui button positive ${
                props.account.loading ? "loading" : ""
              }`}
              type="submit"
              disabled={props.account.loading}
            >
              {t("form.buttons.save", "Save")}
            </button>
          </Form>
        </Accordion.Content>
      </Accordion>
    </>
  );
};

export default Security;
