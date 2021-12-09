// import '../styles/globals.css';

// import type { AppProps } from "next/app";
// import App from "next/app";
// import { Provider } from "react-redux";
// import React from "react";
// import { createWrapper } from "next-redux-wrapper";
// import store from "../../src/store";

// export default function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

// class MyApp extends App {
//   render() {
//     const { Component, pageProps } = this.props;
//     return (
//       <Provider store={store}>
//         <Component {...pageProps} />
//       </Provider>
//     );
//   }
// }

//makeStore function that returns a new store for every request
// const makeStore = () => store;
//
// const wrapper = createWrapper(makeStore);

//withRedux wrapper that passes the store to the App Component
// export default wrapper.withRedux(MyApp);

import { wrapper } from "../store";
import { MoviestoreServiceProvider } from "../components/moviestore-service-context";
import App from "../components/app";
import React from "react";
import MoviestoreService from "../services";

const moviestoreService = new MoviestoreService();

const WrappedApp = ({ Component, pageProps }) => {
  return (
    <MoviestoreServiceProvider value={moviestoreService}>
      <Component {...pageProps} />;
    </MoviestoreServiceProvider>
  );
};

export default wrapper.withRedux(WrappedApp);
