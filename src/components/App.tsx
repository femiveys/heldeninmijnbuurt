import React, { useEffect } from "react";
import Head from "next/head";
import { Layout } from "antd";

import { Main } from "../components/Main";
import { ApplicationHeader } from "../components/ApplicationHeader";

import "../styles.less";
import "../i18n";
import { subscribeToAuthChanges } from "../firebase";

const { Header, Footer, Content } = Layout;

export const App: React.FunctionComponent = ({ children }) => {
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges();
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Head>
        <title>Mijn mondmasker 😷</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header>
          <ApplicationHeader />
        </Header>
        <Content>{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};
