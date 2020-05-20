import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axiosWithAuth()  
            .get('/recipes')
            .then((res) => {
                console.log(res.data);
                setRecipes(res.data)
            })
            .catch((err) => console.log({err}));
    }, []);

    return (
        <div>
            <h1>All Recipes</h1>
            {recipes.map((recipe) => (
                <div className='getRecipes' key={recipe.user_id}>
                    <h2>{recipe.recipeName}</h2>
                    <Link to={`/recipes/${recipe.id}`}>
                        <img 
                            className='img'
                            src={recipe.imageURL}
                            alt='recipe'
                        />
                    </Link>
                    <p>Prep Time: {recipe.prepTime}</p>
                    <p>Cook Time: {recipe.cookTime}</p>
                    <p>Yields: {recipe.yields}</p>
                    <p>Ingredients: {recipe.ingredients}</p>
                    <p>instructions: {recipe.instructions}</p>
                </div>
            ))}
        </div>
    )
}

export default AllRecipes;
