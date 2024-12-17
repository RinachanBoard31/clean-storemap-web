import useSWRMutation from "swr/mutation";
import api from "../../api/api";

export const useCertification = () => {
  const { trigger, isMutating, data, error, reset } = useSWRMutation(
    "http://localhost:8080/auth?accessedType=login",
    api.sendGetRequest
  );
  return {
    triggerCertification: trigger,
    isMutatingCertification: isMutating,
    authUrl: data?.url,
    errorCertification: error,
    resetCertification: reset,
  };
};
