import { UserUpdateType } from '../types/user';

// ユーザ情報の更新する
async function updateUser(url: string, user: UserUpdateType){
  const response = await fetch(url, {
    method: "PUT",
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error(`RequestFailed: url:${url} status:${response.status}`); 
  }
}

async function sendGetRequest(url: string) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`RequestFailed: url:${url} status:${response.status}`);
  }
  return await response.json();
}

async function sendPostRequest<
  T extends {
    [key: string]: unknown;
  }
>(
  url: string,
  {
    arg,
  }: {
    arg: T;
  }
) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`RequestFailed: url:${url} status:${response.status}`);
  }
  return await response.json();
}

export default {
  updateUser,
  sendGetRequest,
  sendPostRequest,
};
