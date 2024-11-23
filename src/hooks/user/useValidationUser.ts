import { User } from "../../types/user";

// フロント側のvalidation
const validation = {
  name: (name: string) => {
    return name == "" ? "名前が空欄です。" : false;
  },
  email: (email: string) => {
    if (email == "") {
      return "emailが空欄です。";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // emailが有効であるかどうか
    if (!emailRegex.test(email)) {
      return "emailの形式が正しくありません。";
    }
    return false;
  },
  age: (age: number) => {
    return age < 0 ? "年齢が空欄です。" : false;
  },
};

export const userValidate = (user: Partial<User>): Record<string, string> => {
  let error: Record<string, string> = {};
  const nameError =
    user.name !== undefined ? validation.name(user.name) : undefined;
  if (nameError) {
    error["name"] = nameError;
  }
  const emailError =
    user.email !== undefined ? validation.email(user.email) : undefined;
  if (emailError) {
    error["email"] = emailError;
  }
  const ageError =
    user.age !== undefined ? validation.age(user.age) : undefined;
  if (ageError) {
    error["age"] = ageError;
  }
  return error;
};
