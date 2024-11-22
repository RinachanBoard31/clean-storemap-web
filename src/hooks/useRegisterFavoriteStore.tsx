import useSWRMutation from "swr/mutation";
import api from "../api/api";

export const useRegisterFavoriteStore = (userId: string) => {
  const { trigger } = useSWRMutation(
    `http://localhost:8080/user/${userId}/favorite-store`,
    api.sendPostRequest
  );

  return { trigger };
};
