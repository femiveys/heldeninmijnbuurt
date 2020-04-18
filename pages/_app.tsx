import "../firebase";
import firebase from "firebase/app";
import Head from "next/head";
import { StoreContext } from "storeon/react";

import { store } from "../store";
import { MainNavigation } from "../components/MainNavigation";
import "../styles.scss";
import "../components/Spinner/Spinner.scss";

firebase.auth().onAuthStateChanged(function (user) {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    store.dispatch("auth/checked");
    store.dispatch("auth/token", null);
    store.dispatch("auth/setUser", null);
    return;
  }
  currentUser
    .getIdToken(true)
    .then(function (idToken) {
      store.dispatch("auth/checked");
      store.dispatch("auth/token", idToken);
      store.dispatch("auth/fetchUser");
    })
    .catch(function (error) {});
});

function MyApp({ Component, pageProps }: any) {
  return (
    <StoreContext.Provider value={store}>
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
    </StoreContext.Provider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
