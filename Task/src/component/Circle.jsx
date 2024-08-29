import  { useState, useRef, useEffect } from 'react';

const Circle = () => {
  const [circles, setCircles] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawCircles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      circles.forEach(circle => {
        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        context.fillStyle = circle.color;
        context.fill();
      });
    };

    drawCircles();
  }, [circles]);

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const radius = Math.random() * 40 + 10;
    const color = getRandomColor();

    const newCircle = { x, y, radius, color };
    setCircles(prevCircles => {
      const updatedCircles = [...prevCircles, newCircle];
      return detectOverlap(updatedCircles);
    });
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const detectOverlap = (circles) => {
    return circles.map(circle1 => {
      let overlapping = false;
      for (let i = 0; i < circles.length; i++) {
        const circle2 = circles[i];
        if (circle1 !== circle2) {
          const distance = Math.sqrt(
            (circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2
          );
          if (distance < circle1.radius + circle2.radius) {
            overlapping = true;
            break;
          }
        }
      }
      return {
        ...circle1,
        color: overlapping ? 'red' : circle1.color
      };
    });
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black' }}
        onClick={handleCanvasClick}
      />
      <p>Click on the canvas to add circles. Circles will turn red if they overlap.</p>
    </div>
  );
};

export default Circle;