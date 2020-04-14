import React, { useState } from "react";
import { Divider, Accordion, Icon, Form, Input } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";

const Security = (props) => {
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
      <h3>Security</h3>
      <Divider />
      <Accordion styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Password
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={
                <Form.Field
                  control={Input}
                  label="Current Password"
                  placeholder="Current Password"
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
                required: "This field is required",
                minLength: { value: 8, message: "Min length is 8" },
              }}
              defaultValue=""
            />
            <Controller
              as={
                <Form.Field
                  control={Input}
                  label="New Password"
                  placeholder="New Password"
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
                required: "This field is required",
                minLength: { value: 8, message: "Min length is 8" },
              }}
              defaultValue=""
            />
            <Controller
              as={
                <Form.Field
                  control={Input}
                  label="Confirm New Password"
                  placeholder="Confirm New Password"
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
                required: "This field is required",
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
              Save
            </button>
          </Form>
        </Accordion.Content>
      </Accordion>
    </>
  );
};

export default Security;
