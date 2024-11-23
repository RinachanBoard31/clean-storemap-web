import stringHelpers from "../../utils/stringHelpers";
import { ChangeEvent } from "react";
import "../../css/user/UserForm.css";

const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>, setFunc: any) => {
  setFunc(e.target.value);
};
const onChangeSelectValue = (
  e: ChangeEvent<HTMLSelectElement>,
  setFunc: any
) => {
  setFunc(e.target.value);
};

function NameFrom(errorMessage: string, setNameFunc: any) {
  return (
    <>
      <label htmlFor="name">名前</label>
      <br />
      <input
        id="name"
        name="name"
        placeholder="名前を入力してください"
        className={errorMessage.includes("Name") ? "errorFrom" : ""}
        onChange={(e) => onChangeInputValue(e, setNameFunc)}
      />
      <br />
    </>
  );
}

function EmailFrom(errorMessage: string, setNameFunc: any) {
  return (
    <>
      <label htmlFor="email">Email</label>
      <br />
      <input
        id="email"
        name="email"
        placeholder="emailを入力してください"
        className={errorMessage.includes("Email") ? "errorFrom" : ""}
        onChange={(e) => onChangeInputValue(e, setNameFunc)}
      />
      <br />
    </>
  );
}

function AgeFrom(
  selectedAgeOptions: Array<string>,
  errorMessage: string,
  setAgeFunc: any
) {
  return (
    <>
      <label htmlFor="age">年齢</label>
      <br />
      <select
        name="selectedAge"
        className={
          stringHelpers.includesAny(errorMessage, "年齢", "Age")
            ? "errorFrom"
            : ""
        }
        onChange={(e) => onChangeSelectValue(e, setAgeFunc)}
      >
        <option key={-1} value={-1}>
          ---
        </option>{" "}
        {/*初期値*/}
        {selectedAgeOptions.map((option, index) => {
          return (
            <option key={option} value={index}>
              {option}
            </option>
          );
        })}
      </select>
      <br />
    </>
  );
}

export default {
  NameFrom,
  EmailFrom,
  AgeFrom,
};
