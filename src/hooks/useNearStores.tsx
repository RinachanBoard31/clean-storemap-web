import useSWRMutation from "swr/mutation";
import api from "../api/api";
import { Store } from "../types/store";

export const useNearStores = () => {
  const { trigger, isMutating, data, error, reset } = useSWRMutation<{stores: Store[]}>(
    "http://localhost:8080/stores/opening-hours",
    api.sendGetRequest
  );

  return {
    triggerNearStore: trigger,
    isMutatingNearStore: isMutating,
    nearStores: data?.stores,
    errorNearStore: error,
    resetNearStore: reset,
  };
};
