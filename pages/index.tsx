import React from "react";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import axios from "axios";
import { destroyCookie, parseCookies } from "nookies";

import styles from "../styles/Home.module.css";

const url = "http://localhost:3006/api/auth/logout";

const User = ({ user }) => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    <Image
      className="rounded"
      src={user?.picture}
      alt="user picture"
      width={100}
      height={100}
    />
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
  const logout = async () => {
    try {
      const response = await axios.get(url);
      console.log(response?.data?.message);
      destroyCookie(null, "sessionID");
      destroyCookie(null, "_session");
      router.push("/signin");
    } catch (err) {
      console.log(err);
    }
  };

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

const getUserSession = async (sessionID: string) => {
  const { data } = await axios.get("http://localhost:3006/api/auth/session", {
    headers: { sessionID },
  });
  return data;
};

export const getServerSideProps = async ({ req, res }) => {
  const { sessionID } = parseCookies({ req }, "sessionID");
  if (!sessionID) {
    res.writeHead(307, { Location: "/signin" });
    res.end();
    return { props: {} };
  }
  const user = await getUserSession(sessionID);
  return { props: { user } };
};
