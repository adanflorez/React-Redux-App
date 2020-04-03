 import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllStores, fetchOwnStores } from "../../state/store/actions";
import { Menu, Segment, Input, Button } from "semantic-ui-react";
import _ from "lodash";

import history from "../../utils/history";
// Components
import StoreList from "./StoreList";

const StoreMainPage = props => {
  const [option, setOption] = useState("all");
  const [filter, setFilter] = useState("");
  let tabs;
  let options;

  useEffect(() => {
    if (option === "all") {
      props.fetchAllStores();
    } else {
      props.fetchOwnStores();
    }
  }, [option]);

  const handleTabClick = (e, { name }) => {
    setOption(name);
  };

  if (props.user.isLoggedIn === true) {
    tabs = (
      <Menu.Item
        name="own"
        active={option === "own"}
        onClick={handleTabClick}
      />
    );
    options = (
      <Menu.Item>
        <Button
          onClick={() => {
            history.push(`${props.match.path}/new`);
          }}
        >
          <i className="plus icon"></i> New
        </Button>
      </Menu.Item>
    );
  }

  const returFilteredStores = () => {
    if (!(filter.length > 0)) {
      return props.store.stores;
    }

    return _.filter(props.store.stores, function(o) {
      let str = o.name.toLowerCase();
      var pos = str.search(filter);
      let strDes = o.description.toLowerCase();
      var posDes = strDes.search(filter);
      return pos!==-1 || posDes!==-1
    });
  };
  console.log("props", props);

  return (
    <div>
      <div>
        <Menu attached="top" tabular>
          <Menu.Item
            name="all"
            active={true}
            active={option === "all"}
            onClick={handleTabClick}
          />
          {tabs}

          <Menu.Menu position="right">
            <Menu.Item>
              <Input
                type="text"
                transparent
                icon={{ name: "search", link: true }}
                placeholder="Search stores..."
                onChange={e => {
                  setFilter(e.target.value);
                }}
              />
            </Menu.Item>

            {options}
          </Menu.Menu>
        </Menu>

        <Segment attached="bottom">
          <StoreList stores={returFilteredStores()} loading={props.store.loading} />
        </Segment>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { store: state.store, user: state.user };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllStores: () => dispatch(fetchAllStores()),
    fetchOwnStores: userId => dispatch(fetchOwnStores(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreMainPage);
