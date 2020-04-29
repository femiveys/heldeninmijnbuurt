import { AppProps } from "next/app";
import { StoreContext } from "storeon/react";
import { initializeFirebaseApp } from "../firebase";
import Main from "../components/Main";
import App from "../components/App";
import { store } from "../store";

initializeFirebaseApp();

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <StoreContext.Provider value={store}>
    <App>
      <Main>
        <Component {...pageProps} />
      </Main>
    </App>
  </StoreContext.Provider>
);

export default CustomApp;
