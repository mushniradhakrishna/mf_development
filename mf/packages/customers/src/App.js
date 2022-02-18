import React, { useEffect } from "react";
import {
  Switch,
  Route,
  Router,
} from "react-router-dom"; /* Router will create history object
                                                         for us unlike of Broweserrouter.*/
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import "./App.scss";
import { DBConfig } from "./dbconfig/DBConfig";
import { initDB } from "react-indexed-db";
import CustomersPage from "./components/CustomerPage";

initDB(DBConfig);

const generateClassName = createGenerateClassName({
  productionPrefix: "cu",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ history }) => {
  let eventsAdded = false;

  // eslint-disable-next-line no-undef
  useEffect(() => {
    const customEvent = new CustomEvent("retrieve_message", {
      detail: handleNewMessage,
    });
    window.dispatchEvent(customEvent);
    eventsAdded = true;
  }, [eventsAdded]);

  const handleNewMessage = (msg) => {
    console.log("Customer Handle");
    console.log(msg);
  };

  window.addEventListener("message", handleNewMessage);

  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/" component={CustomersPage} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
