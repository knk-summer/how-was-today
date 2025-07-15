import { useRef, useEffect, useState } from 'react'

function Canvas() {
  // useRefでDOM要素にアクセス
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")
    if (!ctx) return;
    console.log(ctx);

    ctx.fillStyle = 'red';
    ctx.fillRect(100, 10, 100, 100);
  },[])

  return(
  <canvas 
    ref={canvasRef}
    width="1181" 
    height="1748"
    style={{border: "1px, solid, #333"}}
    >
  </canvas>)
}

export default Canvas