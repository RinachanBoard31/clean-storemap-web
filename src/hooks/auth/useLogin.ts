import useSWRMutation from "swr/mutation";
import api from "../../api/api";
export const loginUser = () => {
  const { trigger, isMutating, error, reset } = useSWRMutation(
    `http://localhost:8080/login`,
    api.sendPostRequest
  );
  return {
    triggerLogin: trigger,
    isMutatingLogin: isMutating,
    errorLogin: error,
    resetLogin: reset,
  };
};
