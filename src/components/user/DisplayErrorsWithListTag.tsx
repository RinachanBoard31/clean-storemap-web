// Note: エラーをliタグで表示する
export const DisplayErrorsWithListTag = (
  errorMessage: Record<string, string>
) => {
  if (Object.keys(errorMessage).length == 0) {
    return <></>;
  }
  return (
    <div className="errorMessage">
      <p>エラーが{Object.keys(errorMessage).length}個あります。</p>
      <ul>
        {Object.keys(errorMessage).map((key: string) => (
          <li key={key}>{errorMessage[key]}</li>
        ))}
      </ul>
    </div>
  );
};
