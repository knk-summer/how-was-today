/** @jsxImportSource @emotion/react */
import { useRef, useEffect, useState } from 'react'
import { Global, css } from '@emotion/react'
import './App.css'
import * as htmlToImage from 'html-to-image';

// 編集アイコンのコンポーネント
function EditAicon({imgAicon, onEditAiconClick}) {
  return(
    <button>
      <img 
        src={imgAicon}
        onClick={onEditAiconClick}
    />
    </button>
    )
}

// 書き込み画面のコンポーネント
function WrittingMode({onWrittingMode, onCloseAiconClick, text, setText}) {
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

  const cssCloseAicon = css`
    width: 24px;
    height: 18px;
    display: block;
    position: absolute;
    right: 0px;
    cursor: pointer;

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
    text-align: right;
  `

  const cssWindowText = css`
    width: 100%;
    margin: 0px 0px 20px 0px;
    text-align: left; 
  `

  const cssInputForm = css`
    width: 100%;
    height: 200px;
    padding: 0px;
    border-style: none none solid;
    border-bottom: solid 2px #C5C5C5;
    resize: none;

  `
  const cssSaveButton = css`
    font-family: "Lato", sans-serif;
    font-style: italic;
    font-size: 26px;
    line-height: 1;
    color: #ffffff;
    padding: 0.5rem 1rem;
  `
  
  if (onWrittingMode) {
    return (
      <div css={cssWrittingMode}>
        <div css={cssWrittingWindow}>
          <span
            css={cssCloseAicon}
            onClick={onCloseAiconClick}
          >
          </span>
          <div css={cssInputTextArea}>
            <p css={cssWindowText}>今日はどんな一日でしたか？ぜひ教えてください！</p>
            <textarea
              css={cssInputForm}
              placeholder="あなたが今日感じたことを書いてみてください"
              value={text}
              onChange={(event) => setText(event.target.value)}
             />
            <button
              css={cssSaveButton}
              onClick={onCloseAiconClick}
            >
              Save
            </button>
          </div>
        </div>
        
      </div>
    )
  } else {
    return <></>
  }
}

// カスタマイズ画面のコンポーネント
function CustomizeMode({onCustomizeMode, topColor, setTopColor, bottomColor, setBottomColor}) {

  const cssCustomizeMode = css`
    width: 80px;
    height: auto;
    background-color: #AFAFAF;
    border-radius: 8px;
    position: absolute;
    top: 25%;
    right: -16px;
    z-index: 1;

    &::before{
      content: "";
      position: absolute;
      display: block;
      width: 0px;
      height; 0px;
      left: -15px;
      top: calc(50% - 15px);
      border-right: 15px solid #AFAFAF;
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
    }
  `

  const cssColorInput = css`
    width: 56px;
    margin: 12px;
  `

  const cssColorLabel = css`
    font-family: "Lato", sans-serif;
    font-style: italic;
    font-weight: bold;
    font-size: 1em;
    color: #ffffff;
    width: 100%;
    display: block;
  `
  const cssColorPicker = css`
    width: 100%;
    height: 32px;
    border: none;
    background: none;
    display: block;
  `

  if (onCustomizeMode) {
    return(
      <div css={cssCustomizeMode}>
        <div className='CustomizeGradationColor'>
          <div css={cssColorInput}>
            <label
              css={cssColorLabel}
              htmlFor='top-color'
            >
              Top
            </label>
            <input css={cssColorPicker} 
              type='color' 
              id='top-color' 
              value={topColor} 
              onChange={(event) => setTopColor(event.target.value)}
            />
          </div>
          <div css={cssColorInput}>
            <label
              css={cssColorLabel}
              htmlFor='bottom-color'
            >
              Bottom
            </label>
            <input css={cssColorPicker} 
              type='color' 
              id='bottom-color' 
              value={bottomColor} 
              onChange={(event) => setBottomColor(event.target.value)}
            />
          </div>
        </div>
      </div> 
    );
  }

}

// 日付のコンポーネント
function DiaryDate() {
  const cssDate = css`
    font-family: sans-serif;
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
  const [nowDate, setNowDate] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNowDate(new Date());
    }, 60000);
     return () => clearInterval(id);
  } ,[nowDate]);

  let nowYear = nowDate.getFullYear();
  let nowMonth = ("0" + (nowDate.getMonth() + 1)).slice(-2);
  let nowDay = nowDate.getDate();

  return (
    <div css={cssDate}>
      <div css={cssMonth}>{nowMonth}</div>
      <div css={cssDateLine}></div>
      <div css={cssDay}>{nowDay}</div>
      <div css={cssYear}>{nowYear}</div>
    </div>
  );
}

// 日記部分（表示）のコンポーネント
function DiaryText({text}) {
  const cssDiaryText = css`
    font-family: sans-serif;
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
    mask: url(./src/assets/window_mask.png);
    position: absolute;
    right: 99px;
    bottom: 164px;
  `
  return <div css={cssGradation}></div>
}

function App() {
  const writingAicon = "./src/assets/write_aicon.png";
  const customizeAicon = "./src/assets/color_aicon.png";
  const downloadAicon = "./src/assets/download_aicon.png";

  // 日記画像の幅（縮小表示）の計算
  const contentsHeight = document.documentElement.clientHeight - 124;
  const scale = contentsHeight / 1748;

  // rootの幅用に計算
  const rootWidth = 1181 * scale;

  // グラデーションの色のstate
  const [topColor, setTopColor] = useState('#333333')
  const [bottomColor, setBottomColor] = useState('#D9D9D9')

   // 入力テキストのstate
  const [text, setText] = useState("");

  //書き込み画面を開いているかのstate
  const [onWrittingMode, setOnWrittingMode] = useState(false);

  //カスタマイズ画面を開いているかのstate
  const [onCustomizeMode, setOnCustomizeMode] = useState(false);

  // 書き込み画面の閉じるアイコンのハンドラ
  function onCloseAiconClick() {
    setOnWrittingMode(false);
  }

  // 入力アイコンのイハンドラ
  function writingAiconClick() {
    setOnWrittingMode(true);
  }

  // カスタマイズアイコンのハンドラ
  function customizeAiconClick() {
    if (!onCustomizeMode) {
      setOnCustomizeMode(true);
    } else {
      setOnCustomizeMode(false);
    }
  }

  // ダウンロードアイコンのハンドラ
  function DownloadAiconClick() {
    const node = document.getElementById('target')
    // 表示用borderを無効化
    node.style.border = 'none';
    // html-to-imageで日記画像をpngに
    htmlToImage.toPng(node,
    {
      // webフォントの処理に迷ったので一旦無効化
      skipFonts: true,
      skipStyle: true,
      style: {
        // 原寸（ポストカード）大に
        transform: 'none',
      }
    })
    .then(function(dataUrl) {
      const link = document.createElement('a');
      link.href = dataUrl
      link.download = 'diary.png'
      link.click();
    })

    // 表示用borderを有効化
    node.style.border = 'solid 1px #C5C5C5';
  }

  const cssRoot = css`
    height: calc(100dvh - 60px);
    width: ${ rootWidth }px;
    margin: 30px 30px;
    text-align: center;
    display: block;
    position: relative;
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
    <WrittingMode
      onWrittingMode={onWrittingMode}
      onCloseAiconClick={onCloseAiconClick}
      text={text}
      setText={setText}
    />
      <div css={cssRoot}>
        <CustomizeMode
          onCustomizeMode={onCustomizeMode}
          topColor={topColor}
          setTopColor={setTopColor}
          bottomColor={bottomColor}
          setBottomColor={setBottomColor}
        />
        <div css={cssAicons}>
          <EditAicon
            imgAicon={writingAicon}
            onEditAiconClick={writingAiconClick}
          />
          <EditAicon
            imgAicon={customizeAicon}
            onEditAiconClick={customizeAiconClick}
          />
          <EditAicon
            imgAicon={downloadAicon}
            onEditAiconClick={DownloadAiconClick}
          />
        </div>
        <div id="target" css={[cssDiaryImage, cssImageVariable]}>
          <DiaryDate />
          <DiaryGradation
            topColor={topColor}
            bottomColor={bottomColor}
          />
          <div css={cssDiaryTextArea}>
            <DiaryText text={text} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
