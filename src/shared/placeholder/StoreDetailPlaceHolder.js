import React from "react";
import { Grid, Placeholder } from "semantic-ui-react";

const StoreDetailPlaceHolder = () => {
  return (
    <Grid divided>
    <Grid.Row>
      <Grid.Column width={8}>
        <Placeholder style={{ height: 512, width: 512 }}>
          <Placeholder.Image />
        </Placeholder>
      </Grid.Column>
      <Grid.Column width={8}>
        <Placeholder>
          <Placeholder.Header>
            <Placeholder.Line />
          </Placeholder.Header>
        </Placeholder>
        <div className="ui divider"></div>
        <Placeholder>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={16}>
        <button disabled className="ui button" style={{ float: "right" }}>
          <i className="arrow left icon"></i>
          Back
        </button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  );
};

export default StoreDetailPlaceHolder;