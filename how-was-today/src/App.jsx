/** @jsxImportSource @emotion/react */
import { useRef, useEffect, useState } from 'react'
import { Global, css } from '@emotion/react'
import Canvas from './Canvas'
import './App.css'

function EditAicon({img}) {
  return <button><img src={img} /></button>
}

function App() {
  const [count, setCount] = useState(0);
  const writeAicon = "/img/write_aicon.png";
  const colorAicon = "/img/color_aicon.png";
  const downloadAicon = "/img/download_aicon.png";

  // 日記画像の幅（縮小表示）の計算
  const contentsHeight = document.documentElement.clientHeight - 124;
  const scale = contentsHeight / 1748;

  // rootの幅用に計算
  const rootWidth = 1181 * scale;

  const topColor ='skyblue';
  const bottomColor ='pink';

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

  const cssEnFont = css`
    font-family: "Lato", sans-serif;
  `

  const cssDate = css`
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

  const cssYear = css`
    font-size: 40px;
    letter-spacing: normal;
    position: absolute;
    bottom: 120px;
    right: 0px;
  `

  const cssGradation = css`
    width: 624px;
    height: 1328px;
    background: linear-gradient(${ topColor }, ${ bottomColor });
    mask: url(/img/window_mask.png);
    position: absolute;
    right: 99px;
    bottom: 164px;
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
  const cssDiaryText = css`
    font-size: 24px;
    text-align: left;
    z-index: 1;
  `

  const cssDiaryImage = css`
    width: 1181px;
    height: 1748px;
    background-color: #ffffff;
    border: solid 1px #C5C5C5;
  `
    // デバイスサイズが縦長か横長かで分岐させる（★まだやってない）
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
      <div css={cssRoot}>
        <div css={cssAicons}>
          <EditAicon img={writeAicon} />
          <EditAicon img={colorAicon} />
          <EditAicon img={downloadAicon} />
        </div>
        <div css={[cssDiaryImage, cssImageVariable]}>
          <div css={[cssDate, cssEnFont]}>
            <div css={cssMonth}>07</div>
            <div css={cssDateLine}></div>
            <div css={cssDay}>23</div>
            <div css={cssYear}>2025</div>
          </div>
          <div css={cssGradation}></div>
          <div css={cssDiaryTextArea}>
            <div css={cssDiaryText}>これはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストです</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
