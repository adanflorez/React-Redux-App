import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchStores, fetchOwnStores } from "../../state/store/actions";
import { Menu, Segment, Input, Button, Pagination } from "semantic-ui-react";
import _ from "lodash";

import history from "../../utils/history";
// Components
import StoreList from "./StoreList";

import { useTranslation } from "react-i18next";

const StoreMainPage = (props) => {
  const { t } = useTranslation();

  const [option, setOption] = useState("all");
  const [filter, setFilter] = useState("");
  let tabs;
  let options;

  useEffect(() => {
    if (option === "all") {
      props.fetchStores(props.store.stores.pagination);
    } else {
      props.fetchOwnStores(props.store.stores.pagination);
    }
  }, [option]);

  const handleTabClick = (e, { name }) => {
    setOption(name);
  };

  if (props.user.isLoggedIn === true) {
    tabs = (
      <Menu.Item name="own" active={option === "own"} onClick={handleTabClick}>
        {t("modules.store.nav.own", "Own")}
      </Menu.Item>
    );
    options = (
      <Menu.Item>
        <Button
          onClick={() => {
            history.push(`${props.match.path}/new`);
          }}
        >
          <i className="plus icon"></i>
          {t("form.buttons.new", "New")}
        </Button>
      </Menu.Item>
    );
  }

  const returFilteredStores = () => {

    if (!(filter.length > 0)) {
      return props.store.stores.list;
    }

    return _.filter(props.store.stores.list, function (o) {
      let str = o.name.toLowerCase();
      var pos = str.search(filter);
      let strDes = o.description.toLowerCase();
      var posDes = strDes.search(filter);
      return pos !== -1 || posDes !== -1;
    });
  };

  const onPageChange = (e, { activePage }) => {
    let pagination = props.store.stores.pagination;
    pagination.page = activePage;
    props.fetchStores(pagination);
  };

  return (
    <>
      <Menu attached="top" tabular>
        <Menu.Item
          name="all"
          active={true}
          active={option === "all"}
          onClick={handleTabClick}
        >
          {t("modules.store.nav.all", "All")}
        </Menu.Item>
        {tabs}

        <Menu.Menu position="right">
          <Menu.Item className="big-screen-component ">
            <Input
              type="text"
              transparent
              icon={{ name: "search", link: true }}
              placeholder={t(
                "modules.store.nav.searchstores",
                "Search stores..."
              )}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            />
          </Menu.Item>

          {options}
        </Menu.Menu>
      </Menu>

      <Segment attached="bottom">
        <StoreList
          stores={returFilteredStores()}
          loading={props.store.loading}
        />
        <br />

        {props.store.stores.pagination && (
          <div style={{ textAlign: "center" }}>
            <Pagination
              boundaryRange={0}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              activePage={props.store.stores.pagination.page}
              onPageChange={onPageChange}
              totalPages={props.store.stores.pagination.pages}
            />
          </div>
        )}
      </Segment>
    </>
  );
};

const mapStateToProps = (state) => {
  return { store: state.store, user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStores: (pagination) => dispatch(fetchStores(pagination)),
    fetchOwnStores: (pagination) => dispatch(fetchOwnStores(pagination)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreMainPage);
