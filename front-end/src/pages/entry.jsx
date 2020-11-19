import React, { useRef, useEffect, useState } from "react";

import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MainPage from "./sign";

import Gallary from './gallery';


const Container = styled.div`
width:100%;
height:100vh;
overflow:hidden;
background-image:url('/images/theme.jpg');
display:flex ; 
flex-direction:column ;
justify-content:center;
align-items :center;

`


const NavTab = styled.div`

width:50%;
height:50%;
background-color:rgba(30, 30 ,30 ,0.6);
border-radius:15px;
box-shadow:0 0 100px 1px rgb(113, 116, 122);
display:flex;
flex-direction:row;
justify-content:space-around;
align-items:center;


`


const Icon = styled.div`

display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
transition: box-shadow 0.3s;
padding:50px 25px 50px 25px;
border-radius:5px;
&:hover{
    cursor:pointer;
    box-shadow:0  0 50px 1px #ddd;
    background-color:transparent;

}
i{
    font-size:70px;
    color:white;

}

h1{
    color:white;
    width:100%;
    margin-top:10px;
      letter-spacing:3px;
    text-align:center;
    font-family:Raleway;
    font-size:15px;
    font-weight:600;
    text-transform:uppercase;

}

`






function Entry() {
    const [state, setState] = useState({ page: 1 });
    useEffect(() => {
    }, [])

    const history = useHistory();


    return (

        <Container>
            <NavTab>
                <Icon onClick={() => history.push('/create')}>
                    <i class="far fa-vr-cardboard"></i>
                    <h1>Robot</h1>
                </Icon>
                <Icon onClick={() => history.push('/gallery')}>
                    <i class="fas fa-camera"></i>
                    <h1>Gallery</h1>
                </Icon>
            </NavTab>
        </Container>)

    if (state.page === 1) {
        return (<MainPage />)
    } else if (state.page === 2) {
        return (<Gallary />)

    }
}

export default Entry;
