import { useCookies } from "react-cookie";

export const useSession = () => {
  const [cookies, , removeCookie] = useCookies(["auth_token"]);

  const deleteSession = () => {
    removeCookie("auth_token");
  };

  const isAuthenticated = () => {
    return !!cookies.auth_token;
  };

  const getSessionId = () => {
    return cookies.auth_token;
  };
  return {
    deleteSession,
    isAuthenticated,
    getSessionId,
  };
};
