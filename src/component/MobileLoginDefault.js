import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import mobile from './Mobile';
import { biggestscreen } from './Mobile';
import MobileFooter from './MobileFooter';
import { AuthContext } from './AuthContext';
import InputComponent from './InputComponent';





const MobileLoginDefault = (props) => {

    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const [errorText, setError] = useState('');

    const auth = useContext(AuthContext);
    const history = useHistory();

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        const userData = {
            email: state.email,
            password: state.password
        };
        axios.post("http://localhost:5000/api/users/login", userData).then((response) => {
            console.log(response.status, response.data.userId, response.data.firstName, response.data.lastName, response.data.email, response.data.token);
            auth.login(response.data.userId, response.data.firstName, response.data.lastName, response.data.email, response.data.token);
            // props.onClick();
            history.push('/');
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data.message);
            } else if (error.request) {
                console.log("network error");
            }
            const errorMessage = error.response.data.message;
            setError(errorMessage);
        });
    };
    return (
        <React.Fragment>
            <BigContainer>
                <NavLabel>
                    <Link to={'/'}><Image src='https://res.cloudinary.com/dcxe2qjbr/image/upload/v1697586895/Konga/kongalogo_liwzkv.png' /></Link>
                </NavLabel>
                <BottomDiv>
                    <TopDiv>
                        <H1>Login</H1>
                    </TopDiv>
                    <Bottom>
                        <form onSubmit={handleSubmit}>
                            <InputComponent label='Email Address' placeholder='Enter Email Address' type='email' value={state.email} name="email" onChange={handleChange} errorText={errorText} />
                            <InputComponent label='Password' placeholder='Enter Password' type='password' value={state.password} name="password" onChange={handleChange} />
                            <ButtonDiv>
                                <RightSideButton type='submit'><H3>Login</H3></RightSideButton>
                            </ButtonDiv>
                        </form>
                    </Bottom>
                    <SignUpDiv>
                        <SignUpButton><SignUpH3>Don't have an Account?</SignUpH3></SignUpButton>
                        <Anchor href="/account/signup"><SignUpButton2>Create an Account</SignUpButton2></Anchor>
                    </SignUpDiv>
                </BottomDiv>
                <MobileFooter />
            </BigContainer>
        </React.Fragment>
    )
}

export default MobileLoginDefault;

const BigContainer = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #F2F2F2;
    box-sizing: border-box;
    z-index: 1000;
    overflow-y: scroll;
    ${mobile({ padding: '0px 20px', alignItems: 'center', zIndex: 1000, position: 'absolute' })};
    ${biggestscreen({ paddingTop: '50px' })};

`
const NavLabel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 20px 0px;
    background-color: #F2F2F2;
    cursor: pointer;
    ${biggestscreen({ padding: 0, })};
`

const Image = styled.img`
    width: 100px;
    height: 50px;
`

const TopDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 60px;
    width: 100%;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom: solid 2px green;
    ${mobile({ boxShadow: 'none', position: 'relative', backgroundColor: 'white', justifyContent: 'center', height: '80px', borderBottom: 'solid 1px #F2F2F2' })};
`

const BottomDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
    padding-top: 20px;
    box-sizing: border-box;
    margin-top: 5px;
    ${mobile({ width: '100%', marginTop: '0px', padding: '0px', backgroundColor: 'white', })};
`

const Bottom = styled.div`
    width: 100%;
    background-color: white;
    box-sizing: border-box;
    padding: 20px;
    ${mobile({ marginTop: '0px', paddingTop: '0px', backgroundColor: 'white' })};
`

const H1 = styled.h1`
    font-size: 25px;
    font-weight: bold;
`
const RightSideButton = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: #33B27B;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
`
const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const H3 = styled.h3`
    font-size: 20px;
    font-weight: bold;
    color: white;
`

const SignUpDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #f2f2f2;
    height: 100px;
    width: 100%;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 0px 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    ${mobile({ boxShadow: 'none', position: 'relative', width: '100%', backgroundColor: 'white', justifyContent: 'center', height: '80px', borderBottom: 'solid 1px #F2F2F2' })};
`

const SignUpButton = styled.div`
    width: 100%;
    height: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    ${mobile({ position: 'relative', width: '100%' })};
`
const SignUpH3 = styled.h3`
    font-size: 16px;
    font-weight: 300;
    color: black;
    ${mobile({ color: 'gray', fontWeight: '200' })};
`

const SignUpButton2 = styled.div`
    width: 100%;
    height: 40px;
    background-color: #F2F2F2;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px #ED017F;
    // padding: 0px 85px;
    box-sizing: border-box;
    border-radius: 5px;
    color: #ED017F;
    font-size: 18px;
    font-weight: bold;

    &:hover {
        background-color: #ED017F;
        color: white;
    }
`

const Anchor = styled.a`
    text-decoration: none;
    width: 100%;
`