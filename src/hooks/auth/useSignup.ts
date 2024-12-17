import useSWRMutation from "swr/mutation";
import api from "../../api/api";

export const useSignup = (query: string) => {
  const { trigger, isMutating, data, error, reset } = useSWRMutation(
    "http://localhost:8080/auth/signup?" + query,
    api.sendGetRequest
  );
  return {
    triggerSignup: trigger,
    isMutatingSignup: isMutating,
    dataSignup: data,
    errorSignup: error,
    resetSignup: reset,
  };
};
