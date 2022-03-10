import React from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import axios from "axios";
import { destroyCookie, parseCookies } from "nookies";

import { apiUrl, baseUrl } from "../utils";

import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const signin = () => {
    try {
      router.push(`${apiUrl}/google?from=${baseUrl}`);
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

export const getServerSideProps = async ({ req, res }) => {
  const { sessionID } = parseCookies({ req }, "sessionID");
  if (sessionID) {
    try {
      const response = await axios.get(`${apiUrl}/logout`);
      console.log(response?.data?.message);
    } catch (err) {
      console.log(err);
    }
    destroyCookie({ res }, "sessionID", { domain: ".vita.org", path: "/" });
    destroyCookie({ res }, "_session", { domain: ".vita.org", path: "/" });
  }
  return { props: {} };
};
