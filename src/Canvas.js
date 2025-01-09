import React, { useRef, useEffect,useState } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
const SignatureCanvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  // 初始化canvas上下文
  const initCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 2;  // 设置线条宽度
      ctx.strokeStyle = '#000';  // 设置线条颜色
      ctx.lineCap = 'round';  // 设置线条末端样式
      ctxRef.current = ctx;
  };
  // 鼠标按下事件
  const handleMouseDown = (e) => {
    const ctx = ctxRef.current;
    if (!ctx) return;  // 确保ctx存在
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const handleMouseMove = (ev) => {
      const moveX = ev.clientX - rect.left;
      const moveY = ev.clientY - rect.top;
      ctx.lineTo(moveX, moveY);
      ctx.stroke();
    };
   // 监听鼠标移动
   document.addEventListener('mousemove', handleMouseMove);
   // 鼠标松开后移除事件监听
   const handleMouseUp = () => {
     document.removeEventListener('mousemove', handleMouseMove);
     document.removeEventListener('mouseup', handleMouseUp);
   };
   document.addEventListener('mouseup', handleMouseUp);
 };
  // 清空canvas
  const handleClear = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // 提交签名，下载图片
  const handleSubmit = async() => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    console.log('签名路径',dataUrl)
    // const urll=JSON.stringify(dataUrl)
    // console.log('签名路径',urll)
    const {data:{code}}=await axios.post('/list',{dataUrl:dataUrl})
    if(code===200){
      alert('签名成功')
      // 下载图片功能
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = '签名';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }else{
      alert('签名失败')
    }
   
  };
  // 设置canvas大小和鼠标事件
  useEffect(() => {
    initCanvas();
    const canvas = canvasRef.current;
    // 绑定原生鼠标事件
    canvas.addEventListener('mousedown', handleMouseDown);

    return () => {
      // 清理事件监听器
      canvas.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="400"
        height="200"
        style={{ margin: '20px', boxShadow: '0px 0px 4px #aaa', cursor: 'url(./pan.cur), auto' }}
      >
        您的浏览器不支持canvas,请升级浏览器
      </canvas>
      <p>
        <button className="submit" onClick={handleSubmit}>提交签名</button>
        <button className="clear" onClick={handleClear}>清空签名</button>
        <h1>哈哈哈哈</h1>
        <h2>咔咔咔咔</h2>
        <h3>啦啦啦啦啦</h3>
      </p>
    </div>
  );
};

export default SignatureCanvas;








