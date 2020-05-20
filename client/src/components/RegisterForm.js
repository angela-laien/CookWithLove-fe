import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import * as yup from 'yup';
import { useHistory } from 'react-router';

const formOutline = yup.object().shape({
    username: yup
        .string()
        .required()
        .min(6, 'Username must be at least 6 characters long'),
    password: yup
        .string()
        .required()
        .min(8, 'password must be at least 8 characters long'),
});

export default function Register() {
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

    const formSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post('/auth/register', formState)
            .then((res) => {
                setRegister([...register, res.data]);

                setFormState({
                    username:'',
                    password: ''
                });
                history.push('/login');
            })
            .catch((err) => {
                console.log(err.res);
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
        <div>
            <form className='form' onSubmit={formSubmit}>
                <input 
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

                <input 
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

                <button className='button' disabled={disableSubmit}>
                    Sign Up
                </button>
            </form>
        </div>
    )
}