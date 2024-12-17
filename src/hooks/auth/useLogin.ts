import useSWRMutation from "swr/mutation";
import api from "../../api/api";

export const useLogin = (query: string) => {
  const { trigger, isMutating, data, error, reset } = useSWRMutation(
    "http://localhost:8080/auth/login?" + query,
    api.sendGetRequest
  );
  return {
    triggerLogin: trigger,
    isMutatingLogin: isMutating,
    dataLogin: data,
    errorLogin: error,
    resetLogin: reset,
  };
};
