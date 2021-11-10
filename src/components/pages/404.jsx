import React from "react";
import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <div>
      <h1 className="page404">404</h1>
      <Link to="/">Back to Home page</Link>
    </div>
  );
};
