import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import Modal from "react-modal";

const UserPage = (props) => {
    const [recipes, setRecipes] = useState([])
    const currentUserId = parseInt(localStorage.getItem("user_id")); 
    const initialRecipe = {
        user_id: currentUserId,
        recipeName: '',
        imageURL: '',
        prepTime: '',
        cookTime: '',
        yields: '',
        ingredients: '',
        instructions: ''
    };
    const [update, setUpdate] = useState(initialRecipe);
    const [modalIsOpen, setIsOpen] = useState({});
    let text;

    useEffect(() => {
        axiosWithAuth()
            .get(`/users/${currentUserId}/recipes`)
            .then((res) => {
                console.log(res.data)
                setRecipes(res.data)
            })
            .catch((err) => console.log({err}));
    },[]);

    const openModal = (item) => {
        setIsOpen({ ...modalIsOpen, [item]: true });
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    const afterOpenModal = () => {
        text.style.color = 'white';
    };

    const deleteRecipe = (e, id) => {
        e.preventDefault();
        axiosWithAuth()
            .delete(`/recipes/${id}`)
            .then((res) => {
                console.log('delete res', res);
                axiosWithAuth()
                    .get(`/users/${currentUserId}/recipes`)
                    .then((res) => {
                        setRecipes(res.data);
                        console.log(res);
                    })
                    .catch((err) => console.log({ err }));
            })
            .catch((err) => console.log('delete err', err));
    }

    const handleChange = (e) => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e, id) => {
        e.preventDefault();
        axiosWithAuth()
            .put(`/recipes/${id}`, update)
            .then((res) => {
                console.log('put res', res);
                axiosWithAuth()
                    .get(`/users/${currentUserId}/recipes`)
                    .then((res) => {
                        setRecipes(res.data);
                        console.log(res);
                    })
                    .catch((err) => console.log({ err }));
            })
            .catch((err) => console.log({ err }));
        setUpdate(initialRecipe);
    };

    return (
       <div>
           <h1>My Recipes</h1>

           {recipes.map((recipe) => (
               <div>
                    <div  className='get' key={recipe.user_id}>
                        <h2>{recipe.recipeName}</h2>
                        <Link to={`/user_pages/${recipe.id}`}>
                            {recipe.imageURL ? (
                                <img 
                                className='img'
                                src={recipe.imageURL}
                                alt='recipe'
                                />
                            ) : (
                                <img 
                                className='img'
                                src='https://img.icons8.com/dusk/64/000000/no-camera.png'
                                alt='not available'
                                />
                            )}
                        </Link>
                        <p>Prep Time: {recipe.prepTime}</p>
                        <p>Cook Time: {recipe.cookTime}</p>
                        <p>Yields: {recipe.yields}</p>
                        <p>Ingredients: {recipe.ingredients}</p>
                        <p>instructions: {recipe.instructions}</p>

                        <div>
                            <div
                                className='edit'
                                onClick={(e) => {
                                    e.preventDefault();
                                    openModal(recipe.recipeName)
                                }}
                            >
                                Edit
                            </div>
                            
                            <div
                                className='delete'
                                onClick={(e) => deleteRecipe(e, recipe.id)}
                            >
                                Delete
                            </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={modalIsOpen[recipe.recipeName]}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        // style={customStyle}
                        contentLabel='Modal'
                    >
                        <div>
                            <h2 ref={(_text) => (text = _text)}>
                                Edit {recipe.recipeName}
                            </h2>
                            <button onClick={closeModal}>
                                <i className='fas fa-times'></i>
                            </button>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <input 
                                    className='formInput'
                                    id='recipeName'
                                    type='text'
                                    name='recipeName'
                                    placeholder={recipe.recipeName}
                                    value={update.recipeName}
                                    onChange={handleChange}
                                />
                                <input 
                                    className='formInput'
                                    id='prepTime'
                                    type='text'
                                    name='prepTime'
                                    placeholder={recipe.prepTime}
                                    value={update.prepTime}
                                    onChange={handleChange}
                                />
                                <input 
                                    className='formInput'
                                    id='cookTime'
                                    type='text'
                                    name='cookTime'
                                    placeholder={recipe.cookTime}
                                    value={update.cookTime}
                                    onChange={handleChange}
                                />
                                <input 
                                    className='formInput'
                                    id='yields'
                                    type='text'
                                    name='yields'
                                    placeholder={recipe.yields}
                                    value={update.yields}
                                    onChange={handleChange}
                                />
                                <input 
                                    className='formInput'
                                    id='ingredients'
                                    type='text'
                                    name='ingredients'
                                    placeholder={recipe.ingredients}
                                    value={update.ingredients}
                                    onChange={handleChange}
                                />
                                <input 
                                    className='formInput'
                                    id='instructions'
                                    type='text'
                                    name='instructions'
                                    placeholder={recipe.instructions}
                                    value={update.instructions}
                                    onChange={handleChange}
                                />
                                <button
                                    className='button'
                                    onClick={(e) => {
                                        handleSubmit(e, recipe.id);
                                        closeModal();
                                    }}
                                >
                                    Update Recipe
                                </button>
                            </form>
                        </div>
                    </Modal>
                </div>
           ))}
       </div> 
    );
};

export default UserPage;