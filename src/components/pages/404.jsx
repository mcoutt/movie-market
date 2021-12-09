import React from "react";
//import { Link } from "react-router-dom";
import Link from "next/link";

import classes from "./pages.module.scss";

export const Page404 = () => {
  return (
    <div>
      <h1 className={classes.page404}>404</h1>
      <Link to="/">Back to Home page</Link>
    </div>
  );
};
