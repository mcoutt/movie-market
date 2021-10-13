import React, { Component, Fragment } from "react";

export default class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: "",
    };
  }

  static getDerivedStateFromError(error) {
    console.error(`Error is: ${error}`);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      errorInfo,
      hasError: true,
    });
    return `Error is ${error} with ${errorInfo}`;
  }

  render() {
    if (this.state.hasError) {
      if (process.env.NODE_ENV === "development") {
        return (
          <Fragment>
            {console.log(this.state.error)}
            {console.log(this.state.errorInfo.toString())}
            <p>{`ErrorInfo boundry is: ${
              this.state.errorInfo ? this.state.errorInfo : "none"
            }`}</p>
            <p>{`Error boundry is: ${
              this.state.error ? this.state.error : "none"
            }`}</p>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <h3>Something went wrong..</h3>
            <pre>Error is</pre>
          </Fragment>
        );
      }
    }
    return this.props.children;
  }
}
