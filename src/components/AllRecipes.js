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
                        <div className='combine'>
                            <h3>Prep Time:</h3><p className="details">{recipe.prepTime}</p>
                            <h3>Cook Time:</h3><p className="details">{recipe.cookTime}</p>
                            </div>
                        <h3>Serving:</h3><p className="details">{recipe.yields}</p>
                        <h3>Ingredients: </h3><p className="details">{recipe.ingredients}</p>
                        <h3>Instructions: </h3><p className="details">{recipe.instructions}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllRecipes;
