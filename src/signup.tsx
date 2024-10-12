import './signup.css'
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
  const canvasSize: number = 500;
  const halfCanvasSize: number = canvasSize/2;
  const margin: number = 50;
  const canWriteCanvasSize: number = canvasSize - (margin*2);
  const canWriteHalfCanvasSize: number = canWriteCanvasSize/2;

  function drawAxis(ctx: CanvasRenderingContext2D) {
    function drawArrow(positon: axisPositionData) {
      const arrowLength = 12;          // 矢印の長さ
      const ang: number = Math.PI / 6; // 矢印の内側の半分の角度(座標軸と矢印のなす角)
      const color: string =  "blue";   // 色
  
      // 角度をラジアンに変換
      const rotationAngle = positon.rotationAngle * (Math.PI / 180);
      const x = positon.x;
      const y = positon.y;
  
      // 矢印の左右の点の計算
      const xStart: number = x + (arrowLength * Math.cos(rotationAngle - ang));
      const yStart: number = y + (arrowLength * Math.sin(rotationAngle - ang));
      const xEnd:   number = x + (arrowLength * Math.cos(rotationAngle + ang));
      const yEnd:   number = y + (arrowLength * Math.sin(rotationAngle + ang));

      // 描画
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(x, y);      
      ctx.lineTo(xEnd, yEnd);
      ctx.stroke();
    }
    // 座標軸の先端と終端の座標と矢印の向きをまとめた型
    interface axisPositionData {
      x: number;
      y: number;
      rotationAngle: number;
    }
    // 座標軸と矢印の向きをセット
    const axisPosition: {[key: string]: axisPositionData}= {
      right: {x:canvasSize-margin ,y:halfCanvasSize, rotationAngle:180},
      top: {x: halfCanvasSize, y: margin, rotationAngle:90},
      left: {x: margin, y: halfCanvasSize, rotationAngle:0},
      bottom: {x: halfCanvasSize, y: canvasSize-margin, rotationAngle:270},
    };
    // 描画
    ctx.beginPath();
    ctx.lineWidth = 5; // 軸の太さ
    // x軸
    let lineargradient = ctx.createLinearGradient(axisPosition.left.x, axisPosition.bottom.y, axisPosition.right.x, axisPosition.top.y)
    lineargradient.addColorStop(0, '#5555ff');
    lineargradient.addColorStop(1, '#ff5555');
    ctx.strokeStyle = lineargradient;
    ctx.moveTo(axisPosition.left.x, axisPosition.left.y);
    ctx.lineTo(axisPosition.right.x, axisPosition.right.y);
    ctx.stroke();
    // y軸
    ctx.moveTo(axisPosition.top.x, axisPosition.top.y);
    ctx.lineTo(axisPosition.bottom.x, axisPosition.bottom.y);
    ctx.stroke();
    // 矢印の描画
    drawArrow(axisPosition.right)
    drawArrow(axisPosition.top)
    drawArrow(axisPosition.left)
    drawArrow(axisPosition.bottom)
  }
  function drawLabel(ctx: CanvasRenderingContext2D) {
    const xPulusLabel:string = "心の性別:女"
    const xMinusLabel:string = "心の性別:男"
    const yPulusLabel:string = "体の性別:女" // y軸の上の方のラベル(第一象限のx,yが共に正になるようにしている)
    const yMinusLabel:string = "体の性別:男"
    ctx.font = "15px serif";
    ctx.fillStyle = "#FF0000";
    ctx.fillText(xPulusLabel, canWriteCanvasSize+(margin/3), canWriteHalfCanvasSize+(margin/3));
    ctx.fillText(yPulusLabel, canWriteHalfCanvasSize+(margin/3), margin*0.8);
    ctx.fillStyle = "#0000FF";
    ctx.fillText(xMinusLabel, margin/3, canWriteHalfCanvasSize+(margin/3));
    ctx.fillText(yMinusLabel, canWriteHalfCanvasSize+(margin/3), canWriteCanvasSize+margin*1.5);
  }
  
  
  

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
    // 軸を描画
    drawAxis(ctx)
    // 軸のラベルを描画
    drawLabel(ctx)
    // クリックされた場所を描画
    // sex,genderの値が-1.0~1.0表記なのでそれを修正する。
    // 縦軸(gender)は上に行くほど正にするので正負を反転させる
    // denormailzingは中心からの距離の非正規化であり、負数になるので正数になるように位置をずらす。
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(denormalizing(sex)+halfCanvasSize, denormalizing(-gender)+halfCanvasSize, 5, 0, 2*Math.PI);
    ctx.fill();
  }, [sex,gender]);

  function normalizing(value: number){
    const normalizingValue =value/(canWriteHalfCanvasSize);
    return Math.max(-1, Math.min(normalizingValue, 1)) // -1.0~1.0の範囲にする
  }
  function denormalizing(value: number){
    return (value * canWriteHalfCanvasSize)
  }

  // 
  function handlePlotSexGender(e:any){
    const canvas:any= canvasRef.current;
    const rect = canvas.getBoundingClientRect();//キャンバスの位置取得
    const clickedXFromCenter: number = (e.clientX - rect.left) - halfCanvasSize; // 中心からのXの距離(正負)
    const clickedYFromCenter: number = (e.clientY - rect.top) - halfCanvasSize; // 中心からのXの距離(正負)

    // (margin/x)はクリック有効範囲のあそびの部分(軸とクリック有効範囲をぴったりに揃えると押せないという違和感を持つため。)
    if (Math.abs(clickedXFromCenter) < canWriteHalfCanvasSize+(margin/3) && Math.abs(clickedYFromCenter) < canWriteHalfCanvasSize+(margin/3)){
      // 値の更新(このときにuseEffectが作動する)
      // 値は-1.0~1.0とする。縦軸は上に行くほど正にするので正負を反転させる
      setSex(normalizing(clickedXFromCenter));
      setGender(-normalizing(clickedYFromCenter));
    }
  }
  return(
    <>
    <div className={"left-item"}>
    <label htmlFor='sex-gender'>性別</label><br/>
    </div>
    <span className="text-center text-3xl">(自身の性別の位置をクリックしてください。)</span>
        <div id="sex-gender-canvas" style={{width: canvasSize }}>
          <canvas ref={canvasRef} 
            width={canvasSize} 
            height={canvasSize} 
            onMouseDown={handlePlotSexGender} 
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
      }else if(errorMessage.includes("年齢")){
        displayedErrorMessages.push("年齢を選択してください。");
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
    <h1 className={"left-item"}>SignUp</h1>
    <form onSubmit={handleCreateUser}>
      <div className={"left-item"}>
      {displayErrors()}  {/* エラーがあるときにエラーを表示する*/}
      <label htmlFor='name' >名前</label><br/>
        <input id='name' name = "name" placeholder='名前を入力してください' className={errorMessages.includes("Name")? "error":""}/><br/>
        <label htmlFor='email'>Email</label><br/>
        <input id='email' name = "email" placeholder='emailを入力してください'className={errorMessages.includes("Email")? "error":""}/><br/>
        <label htmlFor='age'>年齢</label><br/>
        <select name="selectedAge" className={errorMessages.includes("年齢")? "error":""}>
        <option key={-1} value={-1} >---</option> {/*初期値*/}
          {selectedAgeOptions.map((option,index)=>{
            return <option key={option} value={index}>{option}</option>
          })}
        </select><br/>
      </div>
        {sexGenderCanvas({sex,gender,setSex,setGender})}
        <button type="submit">Sign Up</button>  
      </form>
    </>
  )
}

export default Signup