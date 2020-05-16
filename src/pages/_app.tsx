import { AppProps } from "next/app";
import { StoreContext } from "storeon/react";
import App from "../components/App";
import { store } from "../store";

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <StoreContext.Provider value={store}>
    <App>
      <Component {...pageProps} />
    </App>
  </StoreContext.Provider>
);

export default CustomApp;
