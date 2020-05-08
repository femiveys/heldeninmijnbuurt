import React, { useEffect } from "react";
import Head from "next/head";
import { Layout } from "antd";

import AppHeader from "../components/AppHeader";

import "../i18n";
import "../styles.less";
import { subscribeToAuthChanges } from "../firebase";
import AppFooter from "./AppFooter";
import { appName } from "../helpers";

const { Header, Footer, Content } = Layout;

const App: React.FunctionComponent = ({ children }) => {
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges();
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Head>
        <title>{appName}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        />
      </Head>
      <Layout>
        <Header
          style={{ position: "fixed", zIndex: 1, width: "100%", padding: 0 }}
        >
          <AppHeader />
        </Header>
        <Content style={{ marginTop: 64 }}>{children}</Content>
        <Footer style={{ padding: 0 }}>
          <AppFooter />
        </Footer>
      </Layout>
    </>
  );
};

export default App;
