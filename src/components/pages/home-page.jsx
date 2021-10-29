import React from "react";
import HeaderItem from "../header";
import { ContentItem } from "../content";
import { FooterItem } from "../footer";

import "./home-page.scss";

export const HomePage = () => {
  return (
    <div className="container">
      {/*<div className="headerAria">Header</div>*/}
      {/*<div className="context">Context</div>*/}
      {/*<div className="footerAria">Footer</div>*/}
      <div className="row  align-items-start headerSet">
        <div className="col ">
          <HeaderItem />
        </div>
      </div>
      <div className="row contentSet">
        <div className="col">
          <ContentItem />
        </div>
      </div>
      <div className="row align-items-end">
        <FooterItem />
      </div>
    </div>
  );
};
