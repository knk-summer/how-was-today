/** @jsxImportSource @emotion/react */
import { useRef, useEffect, useState } from 'react'
import { Global, css } from '@emotion/react'
import Canvas from './Canvas'
import './App.css'

// 編集アイコンのコンポーネント
function EditAicon({imgAicon, onEditAiconClick}) {
  return <button><img src={imgAicon} onClick={onEditAiconClick} /></button>
}

// 書き込み画面のコンポーネント
function WrittingMode({onWrittingMode}) {
    const cssWrittingMode = css`
    width: 100%;
    height: 100%;
    background-color: rgba(249,249,249,0.9); 
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
  `

  const cssWrittingWindow = css`
    width: 530px;
    height: 430px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
  `

  const cssCloseMark = css`
    width: 24px;
    height: 18px;
    display: block;
    position: absolute;
    right: 0px;

    &::before, &::after {
      content: "";
      width: 20px;
      height: 1px;
      position: absolute;
      background-color: #333333;
      top: 50%;
      left: 50%;
    }

    &::before {
      transform: translate(-50%,-50%) rotate(45deg);
    }

    &::after {
      transform: translate(-50%,-50%) rotate(-45deg);
    }
  `

  const cssInputTextArea = css`
    background-color: #ffffff;
    border: solid 1px #C5C5C5;
    border-radius: 16px;
    margin-top: 26px;
    padding: 40px;
  `

  const cssInputForm = css`
    width: 100%;
    height: 240px;
  `

  if (onWrittingMode) {
    return (
      <div css={cssWrittingMode}>
        <div css={cssWrittingWindow}>
          <span css={cssCloseMark}></span>
          <div css={cssInputTextArea}>
            今日はどんな一日でしたか？ぜひ教えてください！
            <textarea col="28" css={cssInputForm}></textarea>
            <button>Save</button>
          </div>
        </div>
        
      </div>
    )
  }
  return;
}

// 日付のコンポーネント
function DiaryDate() {
  const cssDate = css`
    font-family: "Lato", sans-serif;
    font-style: italic;
    font-weight: normal;
    font-size: 140px;
    user-select: none;
    width: 280px;
    height: 280px;
    position: absolute;
    top: 64px;
    left: 80px;
    line-height: 1;
    letter-spacing: -0.03em;
  `
  const cssYear = css`
    font-size: 40px;
    letter-spacing: normal;
    position: absolute;
    bottom: 120px;
    right: 0px;
  `

  const cssDateLine = css`
    width: 340px;
    height: 6px;
    background-color: #151515;
    transform:rotate(-45deg);
    position: absolute;
    top: 140px;
    left: -32px;
  `

  const cssMonth = css`
    position: absolute;
    top: -8px;
    left: -4px;
  `

  const cssDay = css`
    position: absolute;
    bottom: -8px;
    right: 8px;
  `

  // 日付をstateで管理
  // ★日付変わったかのフラグはまだ。あとで追加
  const [nowDate, setNowDate] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNowDate(new Date());
    }, 60000);
     return () => clearInterval(id);
  } ,[nowDate]);

  // const nowDateStr = Date.parse(nowDate);
  let nowYear = nowDate.getFullYear();
  let nowMonth = ("0" + (nowDate.getMonth() + 1)).slice(-2);
  let nowDay = nowDate.getDate();
  // console.log(nowDay, nowYear, nowMonth);

  return (
    <div css={cssDate}>
      <div css={cssMonth}>{nowMonth}</div>
      <div css={cssDateLine}></div>
      <div css={cssDay}>{nowDay}</div>
      <div css={cssYear}>{nowYear}</div>
    </div>
  );
}

// const Today = () => {
//   const [date] = useState(() => new Date());

//   return <div>{date.toLocaleString()}</div>;
// };

// 日記部分（表示）のコンポーネント
function DiaryText({text}) {
  const cssDiaryText = css`
    font-size: 24px;
    text-align: left;
    user-select: none;
    z-index: 1;
  `
  return <div css={cssDiaryText}>{text}</div>
}

// グラデーション部分のコンポーネント
function DiaryGradation({topColor, bottomColor}) {
  const cssGradation = css`
    width: 624px;
    height: 1328px;
    background: linear-gradient(${ topColor }, ${ bottomColor });
    mask: url(/img/window_mask.png);
    position: absolute;
    right: 99px;
    bottom: 164px;
  `
  return <div css={cssGradation}></div>
}

function App() {
  const writeAicon = "/img/write_aicon.png";
  const colorAicon = "/img/color_aicon.png";
  const downloadAicon = "/img/download_aicon.png";

  // 日記画像の幅（縮小表示）の計算
  const contentsHeight = document.documentElement.clientHeight - 124;
  const scale = contentsHeight / 1748;

  // rootの幅用に計算
  const rootWidth = 1181 * scale;

  // グラデーションの色（仮置き）
  const topColor ='skyblue';
  const bottomColor ='pink';

  const text = "これはダミーテキストです"

  //書き込み画面を開いているかをstateで管理
  const [onWrittingMode, setOnWrittingMode] = useState(false);

  // 入力アイコンのイベントハンドラ
  function WriteAiconClick() {
    setOnWrittingMode(true);
    WrittingMode(onWrittingMode);
    console.log(onWrittingMode);
  }

  // 入力アイコンのイベントハンドラ
  function ColorAiconClick() {
    return;
  }

  // 入力アイコンのイベントハンドラ
  function DownloadAiconClick() {
    return;
  }

  const cssRoot = css`
    height: calc(100dvh - 60px);
    width: ${ rootWidth }px;
    margin: 30px 30px;
    text-align: center;
    background-color: #ccc;
    display: block;
  `
  const cssAicons = css`
    margin-bottom: 16px;
    text-align: right;
  `

  const cssDiaryTextArea = css`
    width: 720px;
    height: 1080px;
    display: flex;
    align-items: flex-start;
    position: absolute;
    bottom: 112px;
    left: 80px;
  `

  const cssDiaryImage = css`
    width: 1181px;
    height: 1748px;
    background-color: #ffffff;
    border: solid 1px #C5C5C5;
  `
    // ★デバイスサイズが縦長か横長かで分岐させる（まだやってない）
    // ★最小サイズも定めたい
  const cssImageVariable = css`
      transform-origin: top left;
      transform: scale(${ scale });
      aspect-ratio: 1181 / 1748;

    // @media screen and (orientation: portrait) {
    //   &{
    //   width: calc(100dvw - 60px);
    //   height: auto;
    //   aspect-ratio: 1181 / 1748;
    //   }
    // }
  `

  return (
    <div>
    <Global
      styles={css`
        body {
          font-family: "Sawarabi Gothic", sans-serif;
          line-height: 1.5;
          font-weight: 400;
          color: #151515;
          background-color: #F9F9F9;
          margin: 0;
          display: flex;
          place-items: center;
          flex-direction: column;
          height: 100dvh;
        }
        button {
          border-radius: 10px;
          padding: 0.5em 0.5em;
          margin-left: 1em;
          font-size: 1em;
          font-weight: 500;
          background-color: #333333;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background-color: #5EA0F5;
        } 
      `}
    />
    <WrittingMode onWrittingMode={onWrittingMode}/>
      <div css={cssRoot}>
        <div css={cssAicons}>
          {/* ★↓クリックイベントをつける */}
          <EditAicon imgAicon={writeAicon} onEditAiconClick={WriteAiconClick} />
          <EditAicon imgAicon={colorAicon} onEditAiconClick={ColorAiconClick} />
          <EditAicon imgAicon={downloadAicon} onEditAiconClick={DownloadAiconClick} />
        </div>
        <div css={[cssDiaryImage, cssImageVariable]}>
          <DiaryDate />
          <DiaryGradation topColor={topColor} bottomColor={bottomColor} />
          <div css={cssDiaryTextArea}>
            <DiaryText text={text} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
