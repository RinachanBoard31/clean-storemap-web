import useSWRMutation from "swr/mutation";
import api from "../api/api";

export const useNearStores = () => {
  const { trigger, isMutating, data, error, reset } = useSWRMutation(
    "http://localhost:8080/stores/opening-hours",
    api.sendGetRequest
  );

  return { trigger, isMutating, data, error, reset };
};
