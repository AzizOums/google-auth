import axios from "axios";
import { parseCookies } from "nookies";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export const getUserSession = async (sessionID: string) => {
  const { data } = await axios.get(`${apiUrl}/session`, {
    headers: { sessionID },
  });
  return data;
};

export const requireAuth = async ({ req, res }) => {
  const { sessionID } = parseCookies({ req }, "sessionID");
  if (!sessionID) {
    res.writeHead(302, { Location: "/signin" });
    res.end();
    return { props: {} };
  }
  const user = await getUserSession(sessionID);
  return { props: { user } };
};
