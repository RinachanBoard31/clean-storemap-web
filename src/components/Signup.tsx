import './Signup.css'
import React, {useState } from "react";
import Api from '../api/api';
import FormData from '../types/formData';
import SexGenderCanvas from './SexGenderCanvas'
import DisplayErrors from './DisplayErrors'
import UserForm from './UserForm';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import userValidate from './userValidation';

function Signup() {
  // sexとgenderは子コンポーネントとして別関数にしているため親コンポーネントであるここで定義をする。
  const [sex,setSex] = useState<number>(0);       // 性別のX座標
  const [gender,setGender] = useState<number>(0); // 性別のY座標
  const [, setCookie,] = useCookies(["isSession"]); // cookieにログイン情報を残すため
  const navigate = useNavigate(); // 画面遷移をするためにuseNavigate フックを使用
  const [errorMessages, setErrorMessage] = useState<string>("");
  

  // 年代の項目
  const selectedAgeOptions: Array<string> = ["10代未満","10代","20代","30代","40代","50代","60代以上"];

  // SignUpボタンが押されたときに起動し通信に必要なデータを取得して通信する
  async function handleCreateUser(event: React.FormEvent<HTMLFormElement>): Promise<void>{
    event.preventDefault();
    const formData: FormData = {
      name: (event.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
      email: (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
      age: Number((event.currentTarget.elements.namedItem('selectedAge') as HTMLSelectElement).value)*10,
      sex: sex,
      gender: gender,
    };
    // inputタグにrequiredを加えても空欄があった際にエラーメッセージが表示されないので自作のvalidationをかける
    const error =userValidate.validate(formData);
    setErrorMessage(error);
    if(error != ""){ // フロント側でエラーがわかる場合にはここで返す。
      return;
    }
    const result = await Api.createUser(formData); // userを作成する。
    if(typeof result === "string"){
      setErrorMessage(result);
    }else{ // エラーがない時
      setCookie("isSession",true); // ログイン情報を登録
      navigate('/'); // 画面遷移
    }
  }

  return (
    <>
    <h1 className={"left-item"}>SignUp</h1>
    <div className={"left-item"}>{DisplayErrors(errorMessages)}</div>
    <form onSubmit={handleCreateUser}>
      <div className={"left-item"}>
        {UserForm.UserFrom(errorMessages)}
        {UserForm.EmailFrom(errorMessages)}
        {UserForm.AgeFrom(selectedAgeOptions, errorMessages)}
      </div>
      {SexGenderCanvas({sex, gender, setSex, setGender})}
      <button type="submit">Sign Up</button>  
      </form>
    </>
  )
}

export default Signup