import stringHelpers from "../utils/stringHelpers";

function UserFrom(errorMessage: string) {
  return (
    <>
      <label htmlFor="name">名前</label>
      <br />
      <input
        id="name"
        name="name"
        placeholder="名前を入力してください"
        className={errorMessage.includes("Name") ? "error" : ""}
      />
      <br />
    </>
  );
}

function EmailFrom(errorMessage: string) {
  return (
    <>
      <label htmlFor="email">Email</label>
      <br />
      <input
        id="email"
        name="email"
        placeholder="emailを入力してください"
        className={errorMessage.includes("Email") ? "error" : ""}
      />
      <br />
    </>
  );
}

function AgeFrom(selectedAgeOptions: Array<string>, errorMessage: string) {
  return (
    <>
      <label htmlFor="age">年齢</label>
      <br />
      <select
        name="selectedAge"
        className={
          stringHelpers.includesAny(errorMessage, "年齢", "Age") ? "error" : ""
        }
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
  UserFrom,
  EmailFrom,
  AgeFrom,
};
