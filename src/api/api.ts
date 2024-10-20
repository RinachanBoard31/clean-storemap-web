import axios from 'axios';
import FormData from '../types/formData';


const requests = {
  getStores: 'http://localhost:8080/',       // GETメソッド 
  createUser: 'http://localhost:8080/user',  // POSTメソッド  
};

// post通信してユーザを作成する
// 返り値: エラーでない時 => {}, エラー時 => string
async function createUser(formData: FormData): Promise<{}| string>{
  const headers = {
    'Content-Type': 'application/json',
  };
  try{
    const result =await axios.post(requests.createUser, formData,{headers: headers});
    return result.data;
  }catch(e){
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

async function callGetStores() {
  try {
    const response = await fetch(requests.getStores);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('error:', error);
  }
};


export default {
  createUser,
  callGetStores,
};