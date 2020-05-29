import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios 
            .get('https://love-cook-800.herokuapp.com/public')
            .then((res) => {
                console.log(res.data);
                setRecipes(res.data)
            })
            .catch((err) => console.log({err}));
    }, []);

    return (
        <div className="all-container">
            <div data-aos="fade-in" data-aos-offset="200" data-aos-duration="1500">
                <h1 className="all-title">Welcome to the 30 Minutes Recipes</h1>
                {recipes.map((recipe) => (
                    <div className='allRecipes' key={recipe.user_id}>
                        <h2 className="recipeTitle">{recipe.recipeName}</h2>
                        <Link to={`/recipes/${recipe.id}`}>
                            <img 
                                className='recipeImg'
                                src={recipe.imageURL}
                                alt='recipe'
                            />
                        </Link>
                        <p className="details">Prep Time: {recipe.prepTime}</p>
                        <p className="details">Cook Time: {recipe.cookTime}</p>
                        <p className="details">Yields: {recipe.yields}</p>
                        <p className="details">Ingredients: {recipe.ingredients}</p>
                        <p className="details">instructions: {recipe.instructions}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllRecipes;
