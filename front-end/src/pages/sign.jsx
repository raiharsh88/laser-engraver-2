import React, { useState, createRef, useEffect } from 'react';
import styled from 'styled-components';
import Canvas from './canvas'
import { NavLink } from 'react-router-dom';

import { Gif, BrandColumn, Blur, Modal, ModalWrapper, Bold, Container, NavTab, ButtonRow, Button, LoadingGIF, Loader, CanvasWrapper } from './styled/signStyled'
const postConfig = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: {}
}



export default function SignPage(props) {

    const [canvasRef, setCanvasRef] = useState(null);
    const [contextRef, setContextRef] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bold, setBold] = useState(false);
    const [modal, setModal] = useState(false);
    const [printing, setPrinting] = useState(false);

    useEffect(() => {

        window.addEventListener('resize', () => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 20);
        })

        fetch('/new').then(res => res).catch(err => console.log(err));
    }, [])

    function setRef(canRef, ctxRef) {
        setCanvasRef(canRef, ctxRef);
        setContextRef(ctxRef);
    }

    function clean() {

        canvasRef.clear()
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

        setLoading(true);
        setModal(false);

        const canvasURL = canvasRef.getCanvas().toDataURL("image/png");
        const FileData = new FormData();
        const canvasFile = dataURItoBlob(canvasURL);
        FileData.append('canvas', canvasFile);

        postConfig.body = FileData;//JSON.stringify({ msg: 'test message', name: 'harsh', lastName: 'rai' });
        var res = await fetch('/image-upload', postConfig)
            .then(data => data.json())
            .then(data => data)
            .catch(err => alert('Something went wrong'));


        if (res.status === 200) {
            setLoading(false);
            setPrinting(true);
            checkPrint();
            clean();
        } else {

        }
    }


    // if (printing === true) {

    // }

    // setTimeout(() => {
    //     setPrinting(false);
    // }, 30000)



    const makeBold = function () {
        const sp = canvasRef.getSignaturePad();
        if (bold == false) {
            sp.maxWidth = 10;
            sp._ctx.lineWidth = 10;


        } else {
            sp.maxWidth = 4;
            sp._ctx.lineWidth = 4;
        }

        setBold(!bold);

    }



    const checkPrint = function () {
        setTimeout(() => {
            fetch('/is-printing').then(res => res.json()).then(res => {
                if (res.msg === 'no') {
                    setPrinting(false);
                    clearInterval(this);
                } else {
                    checkPrint();
                }
            }).catch(err => console.log(err));
        }, 1500)
    }

    if (printing === true) {
        return <Gif src="/images/final.gif" />
    }
    else if (loading == true) {
        <Gif src="/images/loading.gif" />
    }

    return (
        <Container>

            <Blur />
            {modal === true ? <ModalWrapper>
                <Modal>
                    <button onClick={() => printCanvas()}>Confirm</button><button onClick={() => setModal(false)}>Cancel</button>
                </Modal>
            </ModalWrapper> : null}
            {/* <LoadingGIF loading={loading}>
                <div>
                    <Loader />
                </div>
            </LoadingGIF> */}

            {/* <VerticalPad></VerticalPad> */}
            <BrandColumn>Brand Name</BrandColumn>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>            < NavTab>
                {/* <CanvasDraw {...defaultProps} /> */}
                {
                    loading === false ?
                        <Canvas setRef={setRef} loading={loading} /> : null
                }
            </ NavTab>

                <ButtonRow>
                    <Button><NavLink to="/main"><i className="fas fa-home"></i></NavLink></Button>
                    <Button onClick={clean}><i className="far fa-broom"></i></Button>
                    <Button><Bold bold={bold} onClick={makeBold}>B</Bold></Button>
                    <Button onClick={() => setModal(true)}><i className="fas fa-check-circle"></i></Button>
                </ButtonRow>
            </div>

        </Container>
    )
}