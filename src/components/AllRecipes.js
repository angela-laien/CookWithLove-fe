import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("")
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        axios 
            .get('https://insta-cook.herokuapp.com/public')
            .then((res) => {
                console.log(res.data);
                setRecipes(res.data)
            })
            .catch((err) => console.log({err}));
    }, []);

    useEffect(() => {
        setFilteredRecipes(
            recipes.filter((recipe) => 
                recipe.recipeName.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, recipes])

    return (
        <div className="all-container">
            <div data-aos="fade-in" data-aos-offset="200" data-aos-duration="1500">
                <h1 className="all-title">👨‍🍳 Welcome to the Freestyle Kitchen 👩‍🍳 </h1>
                <input className="search"
                type="text"
                placeholder="Search Recipes"
                onChange={(e) => setSearch(e.target.value)}
                />
                {filteredRecipes.map((recipe) => (
                    <div className='allRecipes' key={recipe.user_id}>
                        <h2 className="recipeTitle">{recipe.recipeName}</h2>
                        <Link to={`/recipes/${recipe.id}`}>
                            {recipe.imageURL ? (
                                <img 
                                className='recipeImg'
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
                        
                        <div className='combine'>
                            <h3>Prep Time:</h3><p className="details">{recipe.prepTime}</p>
                            <h3>Cook Time:</h3><p className="details">{recipe.cookTime}</p>
                            </div>
                        <h3>Serving:</h3><p className="details">{recipe.serving}</p>
                        <h3>Ingredients: </h3><p className="details">{recipe.ingredients}</p>
                        <h3>Instructions: </h3><p className="details">{recipe.instructions}</p>
                    </div>
                ))}
                {recipes.map((recipe) => (
                    <div className='allRecipes' key={recipe.user_id}>
                        <h2 className="recipeTitle">{recipe.recipeName}</h2>
                        <Link to={`/recipes/${recipe.id}`}>
                            {recipe.imageURL ? (
                                <img 
                                className='recipeImg'
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
                        
                        <div className='combine'>
                            <h3>Prep Time:</h3><p className="details">{recipe.prepTime}</p>
                            <h3>Cook Time:</h3><p className="details">{recipe.cookTime}</p>
                            </div>
                        <h3>Serving:</h3><p className="details">{recipe.serving}</p>
                        <h3>Ingredients: </h3><p className="details">{recipe.ingredients}</p>
                        <h3>Instructions: </h3><p className="details">{recipe.instructions}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllRecipes;
