import useSWRMutation from "swr/mutation";
import api from "../../api/api";

export const updateUser = (userId: any) => {
  const { trigger, isMutating, data, error, reset } = useSWRMutation(
    `http://localhost:8080/user/${userId}`,
    api.sendPutRequest
  );
  return { trigger, isMutating, data, error, reset };
};
