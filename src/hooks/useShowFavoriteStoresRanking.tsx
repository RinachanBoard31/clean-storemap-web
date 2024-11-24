import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import api from "../api/api";

export const useShowFavoriteStoresRanking = () => {
  const { trigger, isMutating, data, error, reset } = useSWRMutation(
    `http://localhost:8080/stores/favorite-ranking`,
    api.sendGetRequest
  );

  useEffect(() => {
    reset();
    trigger();
  }, [reset, trigger]);

  return {
    isMutatingFavoriteStore: isMutating,
    rankedFavoriteStores: data?.stores,
    errorFavoriteStore: error,
  };
};
