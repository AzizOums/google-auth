import React from "react";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { requireAuth } from "../utils";

import styles from "../styles/Home.module.css";

const User = ({ user }) => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    <Image src={user?.picture} alt="user picture" width={100} height={100} />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 5,
      }}
    >
      <div>{user.name}</div>
      <div>{user.email}</div>
    </div>
  </div>
);

export default function Home({ user }: any) {
  const router = useRouter();
  const logout = async () => router.push("/signin");

  if (!user) return <>No user logged in</>;
  return (
    <div className={styles.container}>
      <Head>
        <title>Google authentification</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <User user={user} />
        <button onClick={logout}>logout</button>
      </main>
    </div>
  );
}

export const getServerSideProps = requireAuth;
