import { UserUpdateType } from "../types/user";
import stringHelpers from "../utils/stringHelpers";

// フロント側で管理するuser側のvalidation
const validation = {
  name: (name: string) => {
    return name == "" ? "Name is blank\n" : "";
  },
  email: (email: string) => {
    if (email == "") {
      return "Email is blank\n";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // emailが有効であるかどうか
    if (!emailRegex.test(email)) {
      return "Email format is invalid\n";
    }
    return "";
  },
  age: (age: number) => {
    return age < 0 ? "Age is blank\n" : "";
  },
};

// userの入力チェックをする
function validate(user: UserUpdateType): string {
  let error: string = "";
  error += validation.name(user.name);
  error += validation.age(user.age);
  return error;
}

// 表示するためにエラーを表示用に変換する
function setErrorMessageToDisplay(errorMessages: string): Array<string> {
  let displayedErrorMessages: Array<string> = [];
  errorMessages.split("\n").forEach((errorMessage) => {
    errorMessage.includes("Name")
      ? displayedErrorMessages.push("nameが空欄です。")
      : "";
    errorMessage.includes("Email")
      ? displayedErrorMessages.push("Emailに誤りがあるため確認してください。")
      : "";
    stringHelpers.includesAny(errorMessage, "年齢", "Age")
      ? displayedErrorMessages.push("年齢を選択してください。")
      : "";
  });
  return displayedErrorMessages.filter((value) => value != ""); // 空文字を除去する
}

export default {
  validation,
  validate,
  setErrorMessageToDisplay,
};
