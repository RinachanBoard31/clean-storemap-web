import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SexGenderCanvas } from "./UserSexGenderCanvas";
import { DisplayErrorsWithListTag } from "./DisplayErrorsWithListTag";
import UserForm from "./UserForm";
import { useUpdateUser } from "../../hooks/user/useUpdateUser";
import { userValidate } from "../../hooks/user/useValidationUser";
import { UserUpdateType } from "../../types/user";
import "../../css/user/UserEdit.css";

export const UserEdit = () => {
  // sexとgenderは子コンポーネントとして別関数にしているため親コンポーネントであるここで定義をする。
  const [sex, setSex] = useState<number>(0); // グラフのX座標
  const [gender, setGender] = useState<number>(0); // グラフのY座標
  const [name, setName] = useState<string>(""); // グラフのY座標
  const [age, setAge] = useState<number>(-1); // グラフのY座標
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { triggerUpdateUser, errorUpdateUser, resetUpdateUser } =
    useUpdateUser();

  useEffect(() => {
    if (errorUpdateUser) {
      setErrorMessage(errorUpdateUser);
    }
  }, [errorUpdateUser]);
  async function handleUpdateUser() {
    const user: UserUpdateType = {
      name: name,
      age: age,
      sex: sex,
      gender: gender,
    };
    // フロント側のvalidateを行う
    const err = userValidate(user);
    if (Object.keys(err).length != 0) {
      setErrorMessage(err);
      return;
    }

    resetUpdateUser();
    await triggerUpdateUser({
      name: user.name,
      age: user.age,
      sex: user.sex,
      gender: user.gender,
    });
    navigate("/home");
  }

  return (
    <>
      <div className={"left-item"}>
        <h1>ユーザ情報入力画面</h1>
        {DisplayErrorsWithListTag(errorMessage)}
        {UserForm.NameFrom(errorMessage, setName)}
        {UserForm.AgeFrom(errorMessage, setAge)}
      </div>

      {SexGenderCanvas({ sex, gender, setSex, setGender })}
      <button onClick={handleUpdateUser}>ユーザ情報入力</button>
    </>
  );
};
