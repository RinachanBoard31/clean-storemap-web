import { useCookies } from "react-cookie";

export const useSession = () => {
  const cookieName = import.meta.env.VITE_JWT_TOKEN_NAME;
  const [cookies, _, removeCookie] = useCookies([cookieName]);

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
