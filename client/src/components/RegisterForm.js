import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import { useToasts } from 'react-toast-notifications';
import styled from 'styled-components';

const companyLogo = require('../Instacook.png');

const formOutline = yup.object().shape({
    username: yup
        .string()
        .required()
        .min(6, 'username must be at least 6 characters long.'),
    password: yup
        .string()
        .required()
        .min(8, 'password must be at least 8 characters long'),
});

export default function Register(props) {
    const { addToast } = useToasts();
    const history = useHistory();

    const [formState, setFormState] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState({
        username: '',
        password: ''
    });

    const [disableSubmit, setDisableSubmit] = useState(true);

    const [register, setRegister] = useState([]);
        useEffect(() => {
            formOutline.isValid(formState).then((valid) => {
                setDisableSubmit(!valid);
            });
        }, [formState]);

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

    const submitForm = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post('/auth/register', formState)
            .then((res) => {
                setRegister([...register, res.data]);

                setFormState({
                    username:'',
                    password: ''
                });
                props.setToast(true);
                history.push('/login');
            })
            .catch((err) => {
                console.log(err.res);
                addToast('Something unexpected happen, please try again shortly', {
                    appearance: 'error',
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
            <Form onSubmit={submitForm}>
                <Logo>
                    <Img 
                        src={companyLogo}
                        className='companylogo'
                        alt='companylogo'
                    />
                </Logo>
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

                <Button disabled={disableSubmit}>
                    Sign Up
                </Button>
            </Form>
        </FormContainer>
    )
}

const FormContainer = styled.div`
    width: 75%;
    margin: 0 auto;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    padding: 3em 3em 5em;
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

const Logo = styled.div`
    display: flex;
    justify-content: center;
`;

const Img = styled.img`
    width: 80%;
    max-width: 400px;
`;

 const Input = styled.input`
    display: block;
    box-sizing: border-box;
    width: 60%;
    max-width: 300px;
    outline: none;
    margin: 0rem 0rem 1rem 0rem;
 `;

 const Button = styled.button`
    border-radius: 7px;
    font-size: 1rem;
    margin-top: 30px;
    padding: 0.6em 1.1em;
    background: hotpink;
    color: white;
    cursor: pointer;
    :hover {
        background: #6dc0ae;
    }
 `;