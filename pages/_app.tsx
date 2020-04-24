// Firebase needs to on top!
import "../firebase";
/////////////////////////////

import { useEffect } from "react";
import Head from "next/head";
import { StoreContext } from "storeon/react";
import { Layout, Spin } from "antd";
import { listenToAuthChanges, useAuth } from "../base/auth";
import { useUser } from "../base/user";
import { ApplicationHeader } from "../components/ApplicationHeader";
import { store } from "../store";

import "../i18n";

// Styles
import "../style.less";

// Listen to firebase auth changes
listenToAuthChanges();

const { Header, Footer, Content } = Layout;

const App = ({ Component, pageProps }: any) => {
  const { firebaseUser } = useAuth();
  const { refreshUser, fetchingUser, user } = useUser();
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
          {!user && fetchingUser ? (
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
