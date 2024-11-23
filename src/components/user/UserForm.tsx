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

function NameFrom(errorMessage: Record<string, string>, setNameFunc: any) {
  return (
    <>
      <label htmlFor="name">名前</label>
      <br />
      <input
        id="name"
        name="name"
        placeholder="名前を入力してください"
        className={
          Object.keys(errorMessage).includes("name") ? "errorFrom" : ""
        }
        onChange={(e) => onChangeInputValue(e, setNameFunc)}
      />
      <br />
    </>
  );
}

function EmailFrom(errorMessage: Record<string, string>, setEmailFunc: any) {
  return (
    <>
      <label htmlFor="email">Email</label>
      <br />
      <input
        id="email"
        name="email"
        placeholder="emailを入力してください"
        className={
          Object.keys(errorMessage).includes("email") ? "errorFrom" : ""
        }
        onChange={(e) => onChangeInputValue(e, setEmailFunc)}
      />
      <br />
    </>
  );
}

function AgeFrom(errorMessage: Record<string, string>, setAgeFunc: any) {
  // 年代の項目
  const selectedAgeOptions: Array<{ key: string; value: number }> = [
    { key: "---", value: -1 },
    { key: "10代未満", value: 0 },
    { key: "10代", value: 10 },
    { key: "20代", value: 20 },
    { key: "30代", value: 30 },
    { key: "40代", value: 40 },
    { key: "50代", value: 50 },
    { key: "60代以上", value: 60 },
  ];
  return (
    <>
      <label htmlFor="age">年齢</label>
      <br />
      <select
        name="selectedAge"
        className={Object.keys(errorMessage).includes("age") ? "errorFrom" : ""}
        onChange={(e) => onChangeSelectValue(e, setAgeFunc)}
      >
        {selectedAgeOptions.map((option) => {
          return (
            <option key={option.key} value={option.value}>
              {option.key}
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
