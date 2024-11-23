export const signupUser = async () => {
  // アクセス後にリダイレクトするのでfetchではなくてwindow.location.hrefを使用する
  window.location.href = "http://localhost:8080/auth";
};
