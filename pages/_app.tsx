// Firebase needs to on top!
import "../firebase";
/////////////////////////////

import Head from "next/head";
import { StoreContext } from "storeon/react";
import { Layout, Spin } from "antd";

import { store } from "../store";

// Styles
import "antd/dist/antd.css";
import "../style.scss";
import { listenToAuthChanges, useAuth } from "../base/auth";
import { useUser } from "../base/user";
import { useEffect } from "react";
import { ApplicationHeader } from "../components/ApplicationHeader";

// Listen to firebase auth changes
listenToAuthChanges();

const { Header, Footer, Content } = Layout;

const App = ({ Component, pageProps }: any) => {
  const { firebaseUser } = useAuth();
  const { refreshUser, fetchingUser } = useUser();
  useEffect(() => {
    if (firebaseUser) refreshUser();
  }, [firebaseUser, refreshUser]);

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
      <Layout>
        <Header>
          <ApplicationHeader />
        </Header>
        <Content>
          {fetchingUser ? (
            <div className="centered-spinner">
              <Spin size="large" />
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
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
