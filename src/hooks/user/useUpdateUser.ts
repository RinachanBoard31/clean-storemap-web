import useSWRMutation from "swr/mutation";
import api from "../../api/api";

export const useUpdateUser = (userId: any) => {
  const { trigger, isMutating, data, error, reset } = useSWRMutation(
    `http://localhost:8080/user/${userId}`,
    api.sendPutRequest
  );
  return {
    triggerUpdateUser: trigger,
    isMutatingUpdateUser: isMutating,
    dataUpdateUser: data,
    errorUpdateUser: error,
    resetUpdateUser: reset,
  };
};
