import React, { Fragment } from "react";
import { HeaderItem } from "../header";
import ContentItem from "../content";
import FooterItem from "../footer";
import ErrorBoundry from "../error-boundaries";
import "./app.scss";

function App() {
  return (
    <ErrorBoundry>
      <Fragment>
        <div className="container">
          <HeaderItem />
          <ContentItem />
          <FooterItem />
        </div>
      </Fragment>
    </ErrorBoundry>
  );
}

export default App;
