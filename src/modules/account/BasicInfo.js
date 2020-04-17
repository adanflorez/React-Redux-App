import React, { useState } from "react";
import { Divider, Input, Form } from "semantic-ui-react";

import { useTranslation } from "react-i18next";

const BasicInfo = (props) => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState({
    value: props.account.accounBasictInfo.username,
    error: undefined
  });
  const [userEmail, setUserEmail] = useState({
    value: props.account.accounBasictInfo.email,
    error: undefined
  });

  const handleNameChange = (event) => {
    let val = event.target.value;

    if (val.length < 4) {
      setUserName({ value: val, error: "Min length is 4" });
    } else {
      setUserName({ value: val });
    }
  };

  const handleEmailChange = (event) => {
    let val = event.target.value;

    var patt = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!patt.test(val)) {
      setUserEmail({
        value: val,
        error: t("form.validationmessages.invalidemail", "Invalid Email"),
      });
    } else {
      setUserEmail({ value: val });
    }
  };

  const onSubmitChangeName = () => {
    if (props.account.accounBasictInfo.username !== userName.value) {
      props.ChangeName(userName.value);
    }
  };

  const onSubmitChangeEmail = () => {
    if (props.account.accounBasictInfo.email !== userEmail.value) {
      props.ChangeEmail(userEmail.value);
    }
  };
  return (
    <>
      <h3>{t("modules.account.basic-info.tittle", "Basic Info")}</h3>
      <Divider />
      <p>
        <b>{t("modules.account.basic-info.form.label.name", "Name")}:</b>
      </p>
      <Form onSubmit={onSubmitChangeName}>
        <Form.Input
          placeholder="Username"
          value={userName.value}
          onChange={handleNameChange}
          disabled={props.account.loading}
          error={
            userName.error && {
              content: userName.error,
              pointing: "below",
            }
          }
        />
        <button
          className={`ui button positive ${
            props.account.loading ? "loading" : ""
          }`}
          type="submit"
          disabled={
            props.account.loading ||
            userName.error ||
            props.account.accounBasictInfo.username === userName.value
          }
        >
          {t("form.buttons.save", "Save")}
        </button>
      </Form>
      <br />

      <p>
        <b>{t("modules.account.basic-info.form.label.email", "Email")}:</b>
      </p>
      <Form onSubmit={onSubmitChangeEmail}>
        <Form.Input
          placeholder="Email..."
          value={userEmail.value}
          onChange={handleEmailChange}
          disabled={props.account.loading}
          error={
            userEmail.error && {
              content: userEmail.error,
              pointing: "below",
            }
          }
        />
        <button
          className={`ui button positive ${
            props.account.loading ? "loading" : ""
          }`}
          type="submit"
          disabled={
            props.account.loading ||
            userEmail.error ||
            props.account.accounBasictInfo.email === userEmail.value
          }
        >
          {t("form.buttons.save", "Save")}
        </button>
      </Form>
    </>
  );
};

export default BasicInfo;
