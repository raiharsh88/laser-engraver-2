import React, { useRef, useEffect, useState } from "react";

const Canvas = function (props) {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);



    useEffect(() => {

        const canvas = canvasRef.current;
        canvas.width = canvasRef.current.parentNode.clientWidth * 2;
        canvas.height = canvasRef.current.parentNode.clientHeight * 2;
        canvas.style.width = `${canvasRef.current.parentNode.clientWidth}px`;
        canvas.style.height = `${canvasRef.current.parentNode.clientHeight}px`;


        const context = canvas.getContext("2d");

        context.scale(1, 1);
        context.lineCap = "round";
        context.strokeStyle = "white";
        context.lineWidth = 6;
        context.globalAlpha = 1;

        contextRef.current = context;

        // Make sure the image is loaded first otherwise nothing will draw.

        props.setRef(canvasRef, contextRef);

    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const drawTouch = ({ nativeEvent }) => {
        const { clientX, clientY } = nativeEvent.changedTouches["0"];
        if (!isDrawing) {
            return;
        }
        contextRef.current.lineTo(clientX, clientY);
        contextRef.current.stroke();
    };
    const touchFunction = ({ nativeEvent }) => {
        //  console.log("Touch Native event", nativeEvent);
        const { clientX, clientY } = nativeEvent.changedTouches["0"];

        contextRef.current.beginPath();
        contextRef.current.moveTo(clientX, clientY);
        setIsDrawing(true);
    };

    const endTouch = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };



    return (
        <div style={{ overflow: "hidden", width: '100%', height: "100%" }}>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                onTouchMove={drawTouch}
                onTouchStart={touchFunction}
                onTouchEnd={endTouch}
                ref={canvasRef}
            />
        </div>
    );
}

export default Canvas;
