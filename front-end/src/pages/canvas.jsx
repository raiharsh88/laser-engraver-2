import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import SignatureCanvas from 'react-signature-canvas'
import { CanvasWrapper } from "./styled/signStyled";

const Canvas = function (props) {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);


    const [dimension, setDimension] = useState({ width: 1, height: 1 })

    useEffect(() => {
        const canvas = canvasRef.current.getCanvas();
        const sp = canvasRef.current.getSignaturePad();
        sp.penColor = "white";
        // sp.maxWidth = 10;
        // sp._ctx.lineWidth = 10;

        setDimension({ width: canvas.parentNode.clientWidth, height: canvas.parentNode.clientHeight })

        props.setRef(canvasRef.current, contextRef);



    }, []);

    // const startDrawing = ({ nativeEvent }) => {
    //     const { offsetX, offsetY } = nativeEvent;
    //     contextRef.current.beginPath();
    //     contextRef.current.moveTo(offsetX, offsetY);
    //     setIsDrawing(true);
    // };

    // const finishDrawing = () => {
    //     contextRef.current.closePath();
    //     setIsDrawing(false);
    // };

    // const draw = ({ nativeEvent }) => {
    //     if (!isDrawing) {
    //         return;
    //     }
    //     const { offsetX, offsetY } = nativeEvent;
    //     contextRef.current.lineTo(offsetX, offsetY);
    //     contextRef.current.stroke();
    // };

    // const drawTouch = ({ nativeEvent }) => {
    //     const { clientX, clientY } = nativeEvent.changedTouches["0"];

    //     console.log("drawing", clientX, clientY)

    //     console.log('TOuce', nativeEvent)
    //     if (!isDrawing) {
    //         return;
    //     }



    //     // console.log('Drawing')
    //     contextRef.current.lineTo(clientX, clientY);
    //     contextRef.current.stroke();
    // };
    // const touchFunction = ({ nativeEvent }) => {
    //     const { clientX, clientY } = nativeEvent.changedTouches["0"];
    //     console.log("Touch Native event", clientX, clientY);

    //     // const { clientX, clientY } = nativeEvent.changedTouches["0"];

    //     contextRef.current.beginPath();
    //     contextRef.current.moveTo(clientX, clientY);
    //     setIsDrawing(true);
    // };

    // const endTouch = () => {
    //     contextRef.current.closePath();
    //     setIsDrawing(false);
    // };



    return (
        <SignatureCanvas ref={canvasRef}
            canvasProps={{ width: dimension.width, height: dimension.height, className: 'sigCanvas', dotSize: 10 }}
        />
    );
}

export default Canvas;
