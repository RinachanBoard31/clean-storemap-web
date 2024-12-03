import { useCookies } from "react-cookie";

export const useSession = () => {
  const cookieName = import.meta.env.VITE_AUTH_COOKIE_NAME;
  const [cookies, , removeCookie] = useCookies(
    // import.meta.env.VITE_AUTH_COOKIE_NAME
    [cookieName]
  );

  const deleteSession = () => {
    removeCookie(cookieName);
  };

  const isAuthenticated = () => {
    return !!cookies[cookieName];
  };

  const getSessionId = () => {
    return cookies[cookieName];
  };
  return {
    deleteSession,
    isAuthenticated,
    getSessionId,
  };
};
