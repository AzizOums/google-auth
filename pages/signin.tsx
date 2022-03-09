import React from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";
import { setCookie } from "nookies";

const baseUrl = "http://localhost:3000";
const url = "http://localhost:3006/api/auth";

export default function Home() {
  const router = useRouter();

  const { sID } = router.query;
  if (sID && typeof window === "undefined") {
    setCookie(null, "sessionID", sID as string, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    router.push("/");
  }

  const signin = () => {
    try {
      router.push(`${url}/google?from=${baseUrl}/signin`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Google authentification</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={signin}>Signin with Google</button>
      </main>
    </div>
  );
}

export const getServerSideProps = ({ res, query: { sID } }) => {
  if (sID) {
    setCookie({ res }, "sessionID", sID as string, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    res.writeHead(307, { Location: "/" });
    res.end();
    return { props: {} };
  }
  return { props: {} };
};
