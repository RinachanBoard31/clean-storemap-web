
import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from '../hooks/userUpdate';
import { UserUpdateType } from '../types/user';
import SexGenderCanvas from './SexGenderCanvas'
import DisplayErrors from './DisplayErrors'
import UserForm from './UserForm';
import userValidate from './userValidation';
import './EditUser.css'
import {useSession} from "../hooks/sessionUser";

export  const EditUser = () =>{
  const {createSession} = useSession();
  // sexとgenderは子コンポーネントとして別関数にしているため親コンポーネントであるここで定義をする。
  const [sex,setSex] = useState<number>(0);       // グラフのX座標
  const [gender,setGender] = useState<number>(0); // グラフのY座標
  const navigate = useNavigate(); // 画面遷移をするためにuseNavigateフックを使用
  const { trigger, reset} = updateUser();
  const [errorMessages, setErrorMessage] = useState<string>("");
  // idの取得
  const url = new URL(window.location.href);
  const params = url.searchParams
  const id = Number(params.get('id'))
  // 年代の項目
  const selectedAgeOptions: Array<string> = ["10代未満","10代","20代","30代","40代","50代","60代以上"];

  // ユーザ情報入力ボタンが押されたときに起動し通信に必要なデータを取得して通信する
  async function handleCreateUser(event: React.FormEvent<HTMLFormElement>): Promise<void>{
    event.preventDefault();
    const user: UserUpdateType = {
      name: (event.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
      age: Number((event.currentTarget.elements.namedItem('selectedAge') as HTMLSelectElement).value)*10,
      sex: sex,
      gender: gender,
    };
    // inputタグにrequiredを加えても空欄があった際にエラーメッセージが表示されないので自作のvalidationをかける
    const err = userValidate.validate(user);
    setErrorMessage(err);
    if(err != ""){ // フロント側でエラーがわかる場合にはここで返す。
      return;
    }
    reset()
    try{
      await trigger({id: id, user: user})
      createSession(id) // idをCookieに保存する
      navigate('/'); // 画面遷移
    }catch(err){
      setErrorMessage(`${err}`);
    }
  }

  return (
    <>
    <h1 className={"left-item"}>ユーザ情報入力画面</h1>
    <div className={"left-item"}>{DisplayErrors(errorMessages)}</div>
    <form onSubmit={handleCreateUser}>
      <div className={"left-item"}>
        {UserForm.NameFrom(errorMessages)}
        {UserForm.AgeFrom(selectedAgeOptions, errorMessages)}
      </div>
      {SexGenderCanvas({sex, gender, setSex, setGender})}
      <button type="submit">ユーザ情報入力</button>  
      </form>
    </>
  )
}