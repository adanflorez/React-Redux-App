import React, { useState, useEffect } from "react";
import { Divider, Input, Form } from "semantic-ui-react";

const BasicInfo = (props) => {
  const [userName, setUserName] = useState({ value: "", error: "" });
  const [userEmail, setUserEmail] = useState({ value: "", error: "" });

  useEffect(() => {
    setUserName({ value: props.account.accounBasictInfo.username });
    setUserEmail({ value: props.account.accounBasictInfo.email });
  }, [props.account.accounBasictInfo]);

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
      setUserEmail({ value: val, error: "Invalid Email!" });
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
      <h3>User Info</h3>
      <Divider />
      <p>
        <b>Name:</b>
      </p>
      <Form onSubmit={onSubmitChangeName}>
        <Form.Input
          placeholder="Username"
          value={userName.value}
          onChange={handleNameChange}
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
          disabled={props.account.loading || userName.error || props.account.accounBasictInfo.username === userName.value}
        >
          Save
        </button>
      </Form>
      <p>
        <b>Email:</b>
      </p>
      <Form onSubmit={onSubmitChangeEmail}>
        <Form.Input
          placeholder="Email..."
          value={userEmail.value}
          onChange={handleEmailChange}
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
          disabled={props.account.loading || userEmail.error || props.account.accounBasictInfo.email === userEmail.value}
        >
          Save
        </button>
      </Form>
    </>
  );
};

export default BasicInfo;
