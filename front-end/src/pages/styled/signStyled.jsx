import styled from 'styled-components'

const Container = styled.div`
width:100%;
height:100vh;
overflow:hidden;
background-image:url('/images/theme.jpg');
display:flex ; 
flex-direction :'column';
background-position:center;
background-repeat:no-repeat;
background-size:cover;
justify-content:center;
align-items :center;

`


const NavTab = styled.div`
width:50%;
height:50%;
background-color:rgba(30, 30 ,30 ,0.9);
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

/* @media (max-width:767px){
    flex-direction:row;
} */
`

const Button = styled.div`
width:90px;
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


const LoadingGIF = styled.div`

display:${props => props.loading === true ? 'block;' : 'none;'};

position:absolute;
top:0;
bottom:0;
left:0;
right:0;

div{
width:100%;
height:100%;
display:flex;
background-color:rgba(30 , 30 ,30 , 0.9);
flex-direction:column ;
justify-content:center;
align-items:center;
}     
`

const Loader = styled.div`
  border: 16px solid #3f3f3f; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  max-width: 120px;
  max-height: 120px;
  animation: spin 2s linear infinite;
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

const CanvasWrapper = styled.div`
width:100%;
height:100%;
@media (max-width:767px) {
    transform:rotate(90deg);
}
`
const Modal = styled.div`

display:flex;
flex-direction:row;

button{
    font-family:'Raleway';
    font-size:17px;
    margin:45px;
    color:white;
    background-color:transparent;
    border: 1px solid #fff;
    padding:12px 16px 12px 16px;

    &:hover{
        cursor:pointer;
        outline:none;
        background-color:rgb(255 ,255,255 );
        color:rgb(30 ,30,30 );
        border: 1px solid #000;





    }
}

`
const ModalWrapper = styled.div`
position:absolute;
top:0;
bottom:0;
left:0;
right:0;
background-color:rgba(0,0,0 ,0.9);
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
const Bold = styled.div`

font-size:63px;
color:white;
font-weight:700;
color:${props => props.bold === true ? 'rgb(255, 48, 69)' : 'white'};
`


export { Modal, ModalWrapper, Bold, Container, NavTab, ButtonRow, Button, LoadingGIF, Loader, CanvasWrapper }