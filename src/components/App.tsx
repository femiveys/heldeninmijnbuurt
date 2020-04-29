import React, { useEffect } from "react";
import Head from "next/head";
import { Layout } from "antd";

import ApplicationHeader from "../components/ApplicationHeader";

import "../i18n";
import "../styles.less";
import { subscribeToAuthChanges } from "../firebase";

const { Header, Footer, Content } = Layout;

const App: React.FunctionComponent = ({ children }) => {
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges();
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Head>
        <title>😷Helden in mijn buurt 😷</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header>
          <ApplicationHeader />
        </Header>
        <Content style={{ paddingTop: 16 }}>{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

export default App;
