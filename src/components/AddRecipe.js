import axiosWithAuth from '../utils/axiosWithAuth';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

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
    serving: yup
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
    const { addToast } = useToasts();
    
    const [formState, setFormState] = useState({
        user_id: parseInt(localStorage.getItem('user_id')),
        recipeName: '',
        prepTime: '',
        cookTime: '',
        serving: '',
        ingredients: '',
        instructions: ''
    });

    const [error, setError] = useState({
        recipeName: '',
        prepTime: '',
        cookTime: '',
        serving: '',
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
                    serving: '',
                    ingredients: '',
                    instructions: ''
                });
                axiosWithAuth()
                    .put(`users/${currentUserId}/recipes/${res.data.id}/image`, formData)
                    .then((res) => {
                        console.log('photo', res.data);
                    });
                    push("/user_page");
                    props.setToast(true);

            })
            .catch((err) => {
                console.log(err.res);
                addToast("something unexpected happened, please try again", {
                    appearance: "error",
                    autoDismiss: true,
                  });
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
        <Add>
            <Form onSubmit={formSubmit}>
                <H3>Add a Recipe</H3>
                <Input 
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

                <Input 
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

                <Input 
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

                <Input 
                    className="form_input"
                    id="serving"
                    type="text"
                    name="serving"
                    placeholder="Serving"
                    value={formState.serving}
                    onChange={inputChange}
                />
                {error.serving.length > 0 ? (
                    <p className="error">{error.serving}</p>
                ) : null}

                <TextArea 
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

                <TextArea
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

                <Input 
                    className='upload'
                    type='file'
                    id='customfile'
                    onChange={onFileChange}
                />
                <Button onClick={formSubmit}>
                    Next
                </Button>
            </Form>
        </Add>
    );
}

const Add = styled.div`
    width: 80%;
    margin: 0 auto;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(152,231,152);
    padding: 0% 10%;
    max-width: 400px;
    margin: 10vh auto;
    box-shadow: 5px 8px 32px 10px rgba(150, 148, 150, 1);
    border-radius: 10px;
`;

 const H3 = styled.h3`
    font-family: "Fugaz One";
    margin: 10% 0%;
    text-align: center;
    font-size: 25px;
    color: rgb(0,100,0);
 `;

 const Input = styled.input`
    display: block;
    border-radius: 3px;
    box-sizing: border-box;
    border: none;
    width: 100%;
    outline: none;
    margin-bottom: 1rem;
    padding: 1.5%;
 `;

 const TextArea = styled.textarea`
    display: block;
    border-radius: 5px;
    box-sizing: border-box;
    border: none;
    width: 100%;
    outline: none;
    margin-bottom: 1rem;
    height: 20vh;
    padding: 1.5%;
`
 const Button = styled.button`
    width: 45%;
    border-radius: 7px;
    font-family: "Lobster";
    font-size: 1rem;
    font-weight: 800;
    margin: 20px 0px 45px 0px;
    padding: 0.8em 0.5em;
    background: rgb(34,139,34);
    color: white;
    cursor: pointer;
    :hover {
    background: rgb(0,100,0);
 `;