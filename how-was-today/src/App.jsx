import { useRef, useEffect, useState } from 'react'
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

  return (
    <>
      <div className="display">
        <div className="edit-aicons">
          <EditAicon img={writeAicon} />
          <EditAicon img={colorAicon} />
          <EditAicon img={downloadAicon} />
        </div>
        <div className="canvas">
          <Canvas />
        </div>
      </div>
    </>
  )
}

export default App
