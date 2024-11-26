import useSWRMutation from "swr/mutation";
import api from "../../api/api";
export const useLogin = () => {
  const { trigger, isMutating, data, error, reset } = useSWRMutation(
    `http://localhost:8080/login`,
    api.sendPostRequest
  );
  return {
    triggerLogin: trigger,
    isMutatingLogin: isMutating,
    userId: data?.userId,
    errorLogin: error,
    resetLogin: reset,
  };
};
