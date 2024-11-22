import { useCookies } from "react-cookie";

export const useSession = () => {
const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const createSession =((value: any)=>{
    setCookie("id", value)
  })

  const deleteSession =(()=>{
    removeCookie("id")
  })

  const isAuthenticated =(()=>{
    return !!cookies.id;
  })

  const getSessionId =(()=>{
    return cookies.id;
  })
  return {
    createSession,
    deleteSession,
    isAuthenticated,
    getSessionId,
  };
};