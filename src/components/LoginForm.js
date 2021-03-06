import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";

const formOutline = yup.object().shape({
    username: yup.string().required('* please enter username'),
    password: yup.string().required('* please enter password')
});

export default function LoginForm(props) {
    const history = useHistory();
    const { addToast } = useToasts();
  
    const [formState, setFormState] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState({
        username: '',
        password: ''
    });

    const [disableSubmit, setDisableSubmit] = useState(true);

    const [login, setLogin] = useState([]);
        useEffect(() => {
            formOutline.isValid(formState).then((valid) => {
                setDisableSubmit(!valid);
            });
        }, [formState]);

        useEffect(() => {
            if(props.toast === true) {
                addToast("You are logged in!", {
                    appearence: "success",
                    autoDismiss: true,
                })
                props.setToast(false);
            }
        }, [props.toast]);

    const validateChange = (e) => {
        yup
            .reach(formOutline, e.target.name)
            .validate(e.target.value)
            .then((valid) => {
                setError({
                    ...error,
                    [e.target.name]: ''
                });
            })
            .catch((err) => {
                setError({
                    ...error,
                    [e.target.name]: err.errors
                });
            });
    };

    const formSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post('/auth/login', formState)
            .then((res) => {
                console.log(res.data.token);
                console.log(res);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_id', JSON.stringify(res.data.loggedUser.id));
                setLogin([...login, res.data]);

                setFormState({
                    username:'',
                    password: ''
                });
                history.push('/user_page');
            })
            .catch((err) => {
                console.log(err.res);
                addToast("invalid login", {
                    appearance: "error",
                    autoDismiss: true,
                });
            });
    };

    const inputChange = (event) => {
        event.persist();
        const newData = {
            ...formState,
            [event.target.name]: 
                event.target.name === 'checkbox'
                    ? event.target.checked
                    : event.target.value
        };
        validateChange(event);
        setFormState(newData);
    };

    return (
        <FormContainer>
            <Form onSubmit={formSubmit}>
                <H1>Welcome Back</H1>
                <Input 
                    className='form'
                    id='username'
                    type='text'
                    name='username'
                    placeholder='enter username'
                    value={formState.username}
                    onChange={inputChange}
                />
                {error.username.length > 0 ?
                    (<p className='error'>{error.username}</p>)
                : null}

                <Input 
                    className='form'
                    id='password'
                    type='password'
                    name='password'
                    placeholder='enter password'
                    value={formState.password}
                    onChange={inputChange}
                />
                {error.password.length > 0 ?
                    (<p className='error'>{error.password}</p>)
                : null}

                <Button disabled={disableSubmit}>Login</Button>
            </Form>
        </FormContainer>
    );
}

const FormContainer = styled.div`
    width: 75%;
    margin: 0 auto;
    padding-top: 100px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    padding: 5%;
    max-with: 400px;
    margin: 11vh auto;
    box-shadow: 0 0 1em green;
    border-radius: 2px;
        .reg-link {
            margin-top: 2rem;
            a {
                color: #3a7669;
                font-weight: bold;
                text-decoration: none;
            }
        }
`;

const H1 = styled.div`
    font-family: "Fugaz One";
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
    color: rgb(255,105,180);
    margin: 0% 0% 5% 0%;
`;

const Input = styled.input`
    display: block;
    box-sizing: border-box;
    width: 200px;
    outline: none;
    padding: 1%;
    margin: 0rem 0rem 1rem 0rem;
`;

const Button = styled.button`
    border-radius: 7px;
    font-family: "Courgette";
    font-size: 1rem;
    font-weight: 800;
    margin: 4% 0%;
    padding: 0.6em 1.1em;
    background: hotpink;
    color: white;
    cursor: pointer;
    :hover {
        background: rgb(60,199,113);
    }
`;