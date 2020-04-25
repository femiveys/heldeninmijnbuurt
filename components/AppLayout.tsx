import React, { useEffect } from "react";
import Head from "next/head";

import { Layout, Spin } from "antd";
import { useAuth } from "../base/auth";
import { useUser } from "../base/user";
import { ApplicationHeader } from "../components/ApplicationHeader";
import { Init } from "../components/Init";

import "../styles/index.less";
import "../i18n";

const { Header, Footer, Content } = Layout;

export const AppLayout = () => {
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
            <Init />
          )}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};
