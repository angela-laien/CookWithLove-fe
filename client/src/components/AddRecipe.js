import axiosWithAuth from '../utils/axiosWithAuth';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

const formOutline = yup.object().shape({
    recipeName: yup
        .string()
        .required()
        .min(3, 'Recipe name should have at least 3 characters!'),
    prepTime: yup
        .string()
        .required()
        .min(4, 'Recipe name should have at least 4 characters!'),
    cookTime: yup
        .string()
        .required()
        .min(4, 'Recipe name should have at least 4 characters!'),
    yields: yup
        .string()
        .required()
        .min(1, 'Recipe name should have at least 1 character!'),
    ingredients: yup
        .string()
        .required()
        .min(3, 'Recipe name should have at least 3 characters!'),
    instructions: yup
        .string()
        .required()
        .min(3, 'Recipe name should have at least 3 characters!'),
});

export default function AddRecipe(props) {
    const { push } = useHistory();
    
    const [formState, setFormState] = useState({
        user_id: parseInt(localStorage.getItem('user_id')),
        recipeName: '',
        prepTime: '',
        cookTime: '',
        yields: '',
        ingredients: '',
        instructions: ''
    });

    const [error, setError] = useState({
        recipeName: '',
        prepTime: '',
        cookTime: '',
        yields: '',
        ingredients: '',
        instructions: ''
    });

    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [file, setFile] = useState('');
    const currentUserId = parseInt(localStorage.getItem('user_id'));

    const [fileName, setFileName] = useState('Choose File');

    useEffect(() => {
        formOutline.isValid(formState).then((valid) => {
            setSubmitDisabled(!valid);
        });
    }, [formState]);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

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
        const formData = new FormData();
        formData.append("photo", file);

        axiosWithAuth()
            .post(`users/${currentUserId}/recipes`, formState)
            .then((res) => {
                setFormState({
                    recipeName: '',
                    prepTime: '',
                    cookTime: '',
                    yields: '',
                    ingredients: '',
                    instructions: ''
                });
                axiosWithAuth()
                    .put(`users/${currentUserId}/recipes/${res.data.id}/image`, formData)
                    .then((res) => {
                        console.log('photo', res.data);
                    });
            })
            .catch((err) => {
                console.log(err.res);
            });
    };

    const inputChange = (event) => {
        event.persist();
        const newFormData = {
            ...formState,
            [event.target.name]:
                event.target.name === 'checkbox'
                    ? event.target.checked
                    : event.target.value,
        };
        validateChange(event);
        setFormState(newFormData);
    };

    return (
        <div>
            <form className='form' onSubmit={formSubmit}>
                <h3>Add a Recipe</h3>
                <input 
                    className="form_input"
                    id="recipeName"
                    type="text"
                    name="recipeName"
                    placeholder="Recipe Name"
                    value={formState.recipeName}
                    onChange={inputChange}
                />
                {error.recipeName.length > 0 ? (
                    <p className="error">{error.recipeName}</p>
                ) : null}

                <input 
                    className="form_input"
                    id="prepTime"
                    type="text"
                    name="prepTime"
                    placeholder="Prep Time"
                    value={formState.prepTime}
                    onChange={inputChange}
                />
                {error.prepTime.length > 0 ? (
                    <p className="error">{error.prepTime}</p>
                ) : null}

                <input 
                    className="form_input"
                    id="cookTime"
                    type="text"
                    name="cookTime"
                    placeholder="Cook Time"
                    value={formState.cookTime}
                    onChange={inputChange}
                />
                {error.cookTime.length > 0 ? (
                    <p className="error">{error.cookTime}</p>
                ) : null}

                <input 
                    className="form_input"
                    id="yields"
                    type="text"
                    name="yields"
                    placeholder="Yields"
                    value={formState.yields}
                    onChange={inputChange}
                />
                {error.yields.length > 0 ? (
                    <p className="error">{error.yields}</p>
                ) : null}

                <input 
                    className="form_input"
                    id="ingredients"
                    type="text"
                    name="ingredients"
                    placeholder="Ingredients"
                    value={formState.ingredients}
                    onChange={inputChange}
                />
                {error.ingredients.length > 0 ? (
                    <p className="error">{error.ingredients}</p>
                ) : null}

                <input 
                    className="form_input"
                    id="instructions"
                    type="text"
                    name="instructions"
                    placeholder="Instructions"
                    value={formState.instructions}
                    onChange={inputChange}
                />
                {error.instructions.length > 0 ? (
                    <p className="error">{error.instructions}</p>
                ) : null}

                <input 
                    className='upload'
                    type='file'
                    id='customfile'
                    onChange={onFileChange}
                />
                <button className='button' onClick={formSubmit}>
                    Next
                </button>
            </form>
        </div>
    );
}