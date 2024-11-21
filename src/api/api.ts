import axios from "axios";
import FormData from "../types/formData";

const requests = {
  getStores: "http://localhost:8080/", // GETメソッド
  createUser: "http://localhost:8080/user", // POSTメソッド
};

// post通信してユーザを作成する
// 返り値: エラーでない時 => {}, エラー時 => string
async function createUser(formData: FormData): Promise<{} | string> {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const result = await axios.post(requests.createUser, formData, {
      headers: headers,
    });
    return result.data;
  } catch (e) {
    // console.error(e); // デバッグ時にはこのコメントアウトを外すことでエラー内容を確認できます。
    // エラーの中にresponseが存在する場合にエラー内容を返す。
    if (axios.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }
    return "unknown error";
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

async function sendPostRequest(url: string, data: any) {
  // const response = await fetch(url, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // if (!response.ok) {
  //   throw new Error(`RequestFailed: url:${url} status:${response.status}`);
  // }
  // return await response.json();
  const stores = {
    stores: [
      {
        id: "1",
        name: "name1",
        regularOpeningHours: "9:00",
        priceLevel: "intermediate",
        location: { latitude: "100.0", longitude: "200.0" },
      },
      {
        id: "2",
        name: "name2",
        regularOpeningHours: "10:00",
        priceLevel: "high",
        location: { latitude: "300.0", longitude: "400.0" },
      },
    ],
  };
  return await stores;
}

export default {
  createUser,
  sendGetRequest,
  sendPostRequest,
};
