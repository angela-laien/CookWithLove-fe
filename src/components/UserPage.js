import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import Modal from "react-modal";
import { useToasts } from "react-toast-notifications";
// import SyncLoader from "react-spinners/SyncLoader";

const UserPage = (props) => {
    const { addToast } = useToasts();
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

    useEffect(() => {
        if(props.toast === true) {
            addToast('New Receipe Added', {
                appearance: 'success',
                autoDismiss: true,
            });
            props.setToast(false);
            axiosWithAuth()
            .get(`/users/${currentUserId}/recipes`)
            .then((res) => {
                console.log(res.data)
                setRecipes(res.data)
            })
            .catch((err) => console.log({err}));
        }
    }, [props.toast]);

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
                setRecipes(recipes.filter((recipe) => recipe.id !== id));
                addToast("Recipe deleted", {
                    appearance: "error",
                    autoDismiss: true,
                });
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
       <div className='userContainer' data-aos="fade-in" data-aos-offset="200" data-aos-duration="1500">
           <h1 className='user-title'>My Recipes</h1>
           <h2 className='note'>Create an account to save and share your recipes :)</h2>
            <div className='list'>
                {recipes.map((recipe) => (
                    <div className='container'>
                            <div  className='get' key={recipe.user_id}>
                                <h2 className='recipeName'>{recipe.recipeName}</h2>
                                <Link to={`/user_pages/${recipe.id}`}>
                                    {recipe.imageURL ? (
                                        <img 
                                        className='userRecipeImg'
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
                                <div className='combo'>
                                    <h3>Prep Time: </h3><p className='des'>{recipe.prepTime}</p>
                                    <h3>Cook Time: </h3><p className='des'>{recipe.cookTime}</p>
                                    <h3>Yields: </h3><p className='des'>{recipe.yields}</p>
                                </div>
                                <h3>Ingredients: </h3><p className='des'>{recipe.ingredients}</p>
                                <h3>Instructions: </h3><p className='des'>{recipe.instructions}</p>

                                <div className='buttonContainer'>
                                    <div
                                        className='edit'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openModal(recipe.recipeName)
                                        }}
                                    >
                                        <a className='btnText'>Edit</a>
                                    </div>
                                    
                                    <div
                                        className='delete'
                                        onClick={(e) => deleteRecipe(e, recipe.id)}
                                    >
                                        <a className='btnText'>Delete</a>
                                    </div>
                                </div>
                            </div>
                            <Modal
                                isOpen={modalIsOpen[recipe.recipeName]}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyle}
                                contentLabel='Modal'
                            >
                                <div className='modalHeader'>
                                    <h2 ref={(_text) => (text = _text)}>
                                        Edit {recipe.recipeName}
                                    </h2>
                                    <button onClick={closeModal}>
                                        <i className='fas fa-times'>close</i>
                                    </button>
                                </div>
                                <div className='updateInput'>
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
       </div> 
    );
};

const customStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      backgroundColor: "pink",
      borderRadius: "8px",
    },
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.37)",
    },
  };
export default UserPage;