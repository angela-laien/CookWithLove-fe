import React from 'react';
import { Link } from 'react-router-dom';

function UserNav() {
    return (
        <div>
            <nav>
                <Link to='/'>All Recipes</Link>
                <Link to='/add_recipe'>Add Recipe</Link>
                <Link to='/user_page'>My Recipes</Link>
            </nav>
        </div>
    )
}

export default UserNav