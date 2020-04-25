import React from "react";
import Head from "next/head";
import { Layout } from "antd";

import { Main } from "../components/Main";
import { ApplicationHeader } from "../components/ApplicationHeader";

import "../styles/index.less";
import "../i18n";

const { Header, Footer, Content } = Layout;

export const App = () => (
  <>
    <Head>
      <title>Mijn mondmasker 😷</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <Header>
        <ApplicationHeader />
      </Header>
      <Content>
        <Main />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  </>
);
