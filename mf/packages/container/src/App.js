import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";

import Progress from "./components/Progress";
import Header from "./components/Header";

const HomeLazy = lazy(() => import("./components/HomeApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const CustomersLazy = lazy(() => import("./components/CustomersApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  let eventsAdded = false;
  let message = "";

  const handleNewMessage = (event) => {
    console.log("Container Handle");
    message = event.detail;
  };

  const SendNewMessage = (event) => {
    console.log("Container Send Handle");
    event.detail(message);
  };

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  useEffect(() => {
    window.addEventListener("send_message", handleNewMessage);
    window.addEventListener("retrieve_message", SendNewMessage);
    eventsAdded = true;
  }, [eventsAdded]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/customers" component={CustomersLazy} />
              <Route path="/" component={HomeLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
