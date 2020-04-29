import { AppProps } from "next/app";
import { StoreContext } from "storeon/react";
import { store } from "../src/store";
import { App } from "../src/components/App";
import { Main } from "../src/components/Main";
import { initializeFirebaseApp } from "../src/firebase";

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
