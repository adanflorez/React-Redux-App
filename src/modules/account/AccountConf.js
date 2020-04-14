import React from "react";
import { Divider, Button } from "semantic-ui-react";
import ConfrimModal from "../../shared/modals/ConfirmModal";

const AccountConf = (props) => {
  return (
    <>
      <h3>Account</h3>
      <Divider />
      <ConfrimModal
        tittle="Delete Account"
        description="Are you sure you want yo delete your account!"
        onAccept={() => {
          props.deleteAccount();
        }}
      >
        <button
          className={`ui button negative ${
            props.account.loading ? "loading" : ""
          }`}
          type="submit"
          disabled={props.account.loading}
        >
          Delete Account
        </button>
      </ConfrimModal>
    </>
  );
};

export default AccountConf;
