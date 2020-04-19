// Firebase needs to on top!
import "../firebase";
/////////////////////////////

import Head from "next/head";
import { StoreContext } from "storeon/react";

import { store } from "../store";
import { MainNavigation } from "../components/MainNavigation";

// Styles
import "../styles.scss";
import "../components/Spinner/Spinner.scss";
import { listenToAuthChanges } from "../base/auth";

// Listen to firebase auth changes
listenToAuthChanges();

const App = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <title>Mijn mondmasker 😷</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <MainNavigation />
      <div className="container py-4">
        <Component {...pageProps} />
      </div>
    </>
  );
};

const Root = ({ Component, pageProps }: any) => {
  return (
    <StoreContext.Provider value={store}>
      <App {...{ Component, pageProps }} />
    </StoreContext.Provider>
  );
};

export default Root;
