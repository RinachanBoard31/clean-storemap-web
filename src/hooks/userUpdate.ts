import useSWRMutation from "swr/mutation";
import api from '../api/api';
import {UserUpdateType} from '../types/user';

const updateUserFetcher = async (url: string, { arg }: { arg: { id: Number, user: UserUpdateType } }) => {
  const apiUrl = `${url}/${arg.id}`; // idをURLに動的に追加
  await api.updateUser(apiUrl, arg.user);
};

export const updateUser = () => {
  const { trigger, isMutating, data, error, reset } = useSWRMutation(
    `http://localhost:8080/user`,
    updateUserFetcher,
  );
  return { trigger, isMutating, data, error, reset };
}