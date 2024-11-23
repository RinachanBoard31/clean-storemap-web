import userValidate from "../hooks/userValidation";

function DisplayErrors(errorMessages: string) {
  if (errorMessages == "") {
    // エラーが存在しない場合
    return false;
  }
  // 受け取ったエラーメッセージを表示用に変える。
  // 指定しているもの以外のエラーに関しては配列に含めたくないのでmapではなくforEachを使用する
  const displayedErrorMessages: Array<string> =
    userValidate.setErrorMessageToDisplay(errorMessages);

  // エラーを表示する
  return (
    <div className="errorMessage">
      {displayedErrorMessages.length == 0 ? (
        <></>
      ) : (
        <>
          <p>エラーが{displayedErrorMessages.length}個あります。</p>
          <ul>
            {displayedErrorMessages.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default DisplayErrors;
