import React from "react";
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

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

const generateClassName = createGenerateClassName({
  productionPrefix: "ho",
});

export default ({ history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          {/*this component does not create browserhistory
                                   of its own instead we will provide  */}
          <Switch>
            <Route path="/" component={Landing} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
