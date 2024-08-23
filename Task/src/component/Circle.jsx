import { useState, useRef, useEffect } from 'react'

const Circle = () => {
    const [circle, setCircle] = useState([]);
    const canvasRef = useRef(null);

    useEffect(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        requestAnimationFrame(()=> drawCircles(ctx, circle));
    },[circle]);

    const drawCircles = (ctx, circle) => {
        ctx.clearReact(0,0,ctx.canvas.width,
        ctx.canvas.height);
        circle.forEach(circle => {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y,circle.radius, 0, Math.PI*2,
            false)
            ctx.fillStyle = circle.color;
            ctx.fill();
            ctx.stroke();
        });
    };

    const handleCanvas = (e) =>{
        const canvasReact = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - canvasReact.left;
        const y = e.clientY - canvasReact.top;
        addCircle(x,y);

    }

    const addCircle = (x,y)=>{
        const radius = Math.floor(Math.random()*42) + 10
        const color = getRandomColor();
        const newCircle = {x,y, radius,color};
        setCircle((PrevCircle ) =>{
            checkOverlap(newCircle, PrevCircle);
            return [...PrevCircle, newCircle]
        })
    }

    const checkOverlap = (circle, circles) =>{
        for (let i = 0; i < circles.length; i++) {
            const otherCircle = circles[i]
            const dx = circle.x - otherCircle.x
            const dy = circle.y - otherCircle.y
            const distance = Math.sqrt(dx*dx+dy*dy)
            if (distance < circle.radius + otherCircle.radius) {
                circle.color = 'blue'
                otherCircle.color = 'blue'
    }
        }}

     const getRandomColor = () => {
        const letters =  '0123456789ABCDEF';
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
            return color;
     }   

  return (
    <div className='container px-3 py-3'>
      <h1>cicle</h1>
      <div className="circle container">
            <canvas>
                ref = {canvasRef}
                width={500}
                heigh={500}
                onClick={(e) =>handleCanvas(e) }
            </canvas>
      </div>
    </div>
  )
}

export default Circle
