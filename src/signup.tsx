import React, {useEffect, useRef, useState } from "react";
import axios from 'axios';
import requests from './utils/Request';

// sex,genderの引数を外部から参照したいためsex,genderは外部で定義し引数として受け取る
function sexGenderCanvas({sex, gender, setSex, setGender}: {
    sex: number, 
    gender: number,
    setSex: (newValue: number)=> void, 
    setGender: (newValue: number)=> void,
  }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);//canvas要素取得
  const canvasSize = 400;
  const halfCanvasSize = canvasSize/2;
  // 値を中心に置くように初期化する。(初回レンダリング時のみ実行)
  useEffect(()=>{
    setSex(0);
    setGender(0);
  },[]);
  // sex,genderの値が変わったときにcanvasを更新する
  useEffect(() => {
    if (!canvasRef.current) {
        throw new Error("canvas要素の取得に失敗しました");
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("context取得失敗");
    }

    //描画前に既に描画済みのものを消してリセット
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(canvasSize/2-5, 10, 10, canvasSize-10);
    ctx.fillRect(10, canvasSize/2-5, canvasSize-10, 10);

    //赤色の四角形を描画
    ctx.fillStyle = "red";
    // sex,genderの値が-1.0~1.0表記なのでそれを修正する。
    // 縦軸(gender)は上に行くほど正にするので正負を反転させる
    ctx.fillRect(denormalizing(sex), denormalizing(-gender), 10, 10);
  }, [sex,gender]);

  function normalizing(value: number){
    return (value-halfCanvasSize)/(halfCanvasSize);
  }
  function denormalizing(value: number){
    return (value * halfCanvasSize)+halfCanvasSize;
  }

  // 
  function handlePlotSexGender(e:any){
    const canvas:any= canvasRef.current;
    const rect = canvas.getBoundingClientRect();//キャンバスの位置取得
    // 値の更新(このときにuseEffectが作動する)
    // 値は-1.0~1.0とする。縦軸は上に行くほど正にするので正負を反転させる
    setSex(normalizing(e.clientX - rect.left));
    setGender(-normalizing(e.clientY - rect.top));
  }
  return(
    <>
    <h1 className="text-center text-3xl">性別</h1>
                <h2 style={{color: 'black'}}>座標</h2>
                <p style={{color: 'black'}}>x軸:{sex}</p>
                <p style={{color: 'black'}}>y軸:{gender}</p>
        <div className="genderCanvas" style={{ background: 'white' }}>
          <canvas ref={canvasRef} 
            width={canvasSize} 
            height={canvasSize} 
            onMouseDown={handlePlotSexGender} 
            className="border border-blue-700" 
          />
    </div>
    </>
  )
}



function Signup() {
  // sexとgenderは子コンポーネントとして別関数にしているため親コンポーネントであるここで定義をする。
  const [sex,setSex] = useState<number>(0);       // 性別のX座標
  const [gender,setGender] = useState<number>(0); // 性別のY座標
  const [errorMessages, setErrorMessage] = useState<string>("");
  function displayErrors(){
    if(errorMessages == ""){ // エラーが存在しない場合
      return false
    }
    // 受け取ったエラーメッセージを表示用に変える。
    // 指定しているもの以外のエラーに関しては配列に含めたくないのでmapではなくforEachを使用する
    const displayedErrorMessages: Array<string> =[];
    errorMessages.split("\n").forEach((errorMessage) => {
      if(errorMessage.includes("Name")){
        displayedErrorMessages.push("nameが空欄です。");
      }else if(errorMessage.includes("Email")){
        displayedErrorMessages.push("Emailに誤りがあるため確認してください。");
      }
    })
    // エラーを表示する
    return (
      <div className="errorMessage">
        {(displayedErrorMessages.length == 0)? <></>:(
          <>
            <p>エラーが{displayedErrorMessages.length}個あります。</p>
            <ul>
              {displayedErrorMessages.map((msg) => 
                <li key={msg}>{msg}</li>
              )}
            </ul>
          </>
        )}
      </div> 
    )
  }
  // post通信する時のdataの型
  interface FormData {
    name: string;
    email: string;
    age: number;
    sex: number;
    gender: number;
  }
  // 年代の項目
  const selectedAgeOptions: Array<string> = ["10代未満","10代","20代","30代","40代","50代","60代以上"];

  // post通信してユーザを作成する
  async function createUser(formData: FormData){
    const headers = {
      'Content-Type': 'application/json',
    }
    try{
      const result =await axios.post(requests.createUser, formData,{headers: headers});
      alert("作成しました。")
      return result.data
    }catch(e){
      // console.error(e); // デバッグ時にはこのコメントアウトを外すことでエラー内容を確認できます。
      // responseが存在する場合にエラー内容を返す。
      if (axios.isAxiosError(e)) {
        if (e.response) {
          return e.response.data;
        }
      }
      return null
    }
  }

  // SignUpボタンが押されたときに起動し通信に必要なデータを取得して通信する
  async function handleCreateUser(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const formData: FormData = {
      name: (event.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
      email: (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
      age: Number((event.currentTarget.elements.namedItem('selectedAge') as HTMLSelectElement).value)*10,
      sex: sex,
      gender: gender,
    };
    const result = await createUser(formData);
    if(typeof result === "string"){
      setErrorMessage(result);
    }
  }



  return (
    <>
    <h1>SignUp</h1>
    <form onSubmit={handleCreateUser}>
      {displayErrors()}  {/* エラーがあるときにエラーを表示する*/}
      <label htmlFor='name'>name</label><br/>
        <input id='name' name = "name" placeholder='名前を入力してください'/><br/>
        <label htmlFor='email'>email</label><br/>
        <input id='email' name = "email" placeholder='emailを入力してください'/><br/>
        <label htmlFor='age'>age</label><br/>
        <select name="selectedAge">
          {selectedAgeOptions.map((option,index)=>{
            return <option key={option} value={index}>{option}</option>
          })}
        </select>
        {sexGenderCanvas({sex,gender,setSex,setGender})}
        <button type="submit">Sign Up</button>  
      </form>
    </>
  )
}

export default Signup