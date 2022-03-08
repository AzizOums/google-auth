import React from "react";
import { useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";

const url = "http://localhost:3006/api/auth";

// const logout = async () => {
//   try {
//     const response = await axios.get(`${url}/logout`);
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// };

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

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (router?.query?.user) setUser(JSON.parse(router.query?.user as string));
  }, [router?.query?.user]);

  const signin = () => {
    try {
      router.push(`${url}/google?from=http://localhost:3000`);
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
        {user ? (
          <User user={user} />
        ) : (
          <button onClick={signin}>Signin with Google</button>
        )}
      </main>
    </div>
  );
}
