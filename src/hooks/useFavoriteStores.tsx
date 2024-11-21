import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import api from "../api/api";
import { Store } from "../types/store";

export const useFavoriteStores = (userId: string) => {
  const { trigger, isMutating, data, error, reset } = useSWRMutation<
    { stores: Store[] },
    any,
    string,
    { userId: string }
  >("http://localhost:8080/users/favorite", api.sendPostRequest);

  useEffect(() => {
    reset();
    trigger({ userId: userId });
  }, [userId, reset, trigger]);

  return {
    isMutatingFavoriteStore: isMutating,
    favoriteStores: data?.stores,
    errorFavoriteStore: error,
  };
};
