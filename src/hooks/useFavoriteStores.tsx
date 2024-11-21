import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import api from "../api/api";

export const useFavoriteStores = (userId: string) => {
  const { trigger, isMutating, data, error, reset } = useSWRMutation(
    `http://localhost:8080/users/${userId}/favorite`,
    api.sendGetRequest
  );

  useEffect(() => {
    reset();
    trigger();
  }, [reset, trigger]);

  return {
    isMutatingFavoriteStore: isMutating,
    favoriteStores: data?.stores,
    errorFavoriteStore: error,
  };
};
