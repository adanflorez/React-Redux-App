import React from "react";
import { Card, Placeholder } from "semantic-ui-react";

const CardPlaceHolder = () => {
  return (
    <Card>
      <Placeholder>
        <Placeholder.Image />
      </Placeholder>
      <Card.Content>
        <Card.Header>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        </Card.Header>
        <Card.Description>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Placeholder>
          <Placeholder.Paragraph>
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </Card.Content>
    </Card>
  );
};

export default CardPlaceHolder;