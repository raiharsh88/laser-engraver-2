import React, { useState, createRef, useEffect } from 'react';
import styled from 'styled-components';
import Canvas from './canvas'
import { NavLink } from 'react-router-dom';

const postConfig = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: {}
}

const Container = styled.div`
width:100%;
height:100vh;
overflow:hidden;
background-image:url('/images/theme.jpg');
display:flex ; 
flex-direction :'row';
background-position:center;
background-repeat:no-repeat;
background-size:cover;
justify-content:center;
align-items :center;
`


const NavTab = styled.div`
width:50%;
height:50%;
background-color:rgba(220, 220 ,220 ,0.9);
border-radius:15px;
border-top-right-radius:0;
border-bottom-right-radius:0;
box-shadow:0 0 100px 1px rgb(113, 116, 122);
display:flex;

flex-direction:row;
justify-content:space-around;
align-items:center;
`

const ButtonRow = styled.div`
width:auto;
height:50%;
margin:0;
display:flex;
flex-direction:column;
align-items:center;
border-top-right-radius:15px;
border-bottom-right-radius:15px;

background-color:rgba(0, 0 ,0 ,0.8);

justify-content:flex-start;
`

const Button = styled.div`
width:120px;
display:flex;
flex-direction:column;
justify-content:center;
background-color:transparent;
font-family:'Raleway';
font-size:17px;
border:none;
transition:opacity 0.4s;
font-weight:600;
color:white;
border:none;
outline:none;
text-align:center;
text-transform:uppercase;
flex:1;
i{  color:white;
    font-size:42px;
    
}
&:hover{
    cursor: pointer;
    opacity:0.7;
}

`
export default function SignPage(props) {

    const [canvasRef, setCanvasRef] = useState(null);
    const [contextRef, setContextRef] = useState(null);
    const [file, setFile] = useState({ file: null });


    function setRef(canRef, ctxRef) {
        setCanvasRef(canRef, ctxRef);
        setContextRef(ctxRef);
    }

    function clean() {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    }


    function dataURItoBlob(dataURI) {
        var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: mime });
    }

    async function printCanvas() {
        const canvasURL = canvasRef.current.toDataURL("image/png");
        const FileData = new FormData();
        const canvasFile = await dataURItoBlob(canvasURL);
        FileData.append('canvas', canvasFile);

        postConfig.body = FileData;//JSON.stringify({ msg: 'test message', name: 'harsh', lastName: 'rai' });
        var res = await fetch('/image-upload', postConfig)
            .then(data => data.json())
            .then(data => data)
            .catch(err => alert('Something went wrong'));




    }




    return (
        <Container>
            <NavTab >
                <Canvas setRef={setRef} />
            </NavTab>
            <ButtonRow><Button><NavLink to="/main"><i className="fas fa-home"></i></NavLink></Button>
                <Button onClick={clean}><i className="far fa-broom"></i></Button>
                <Button onClick={printCanvas}><i className="fas fa-check-circle"></i></Button>
            </ButtonRow>
        </Container>
    )
}