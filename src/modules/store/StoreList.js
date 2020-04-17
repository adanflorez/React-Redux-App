import React from "react";
import StoreItem from "./StoreItem";
import Message from "../../shared/components/message";
import CardPlaceHolder from "../../shared/placeholder/CardPlaceHolder";
import { Card } from "semantic-ui-react";

const renderStores = stores => {
  return stores.map(store => {
    return <StoreItem key={store.id} store={store} />;
  });
};

const StoreList = ({ stores, loading }) => {

  if (loading) {
    let amoutOfCards = [1, 2, 3];

    return (
      <Card.Group>
        {amoutOfCards.map(id => {
          return <CardPlaceHolder key={id} />;
        })}
      </Card.Group>
    );
  }

  if (stores.length > 0) {
    return <div className="ui link cards"> {renderStores(stores)} </div>;
  } else {
    return (
      <Message tittle={"Sorry"} message={"We have not found any stores !"} />
    );
  }
};

export default StoreList;
