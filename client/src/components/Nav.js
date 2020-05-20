import React from "react";
import { Link } from "react-router-dom";

function Nav() {
    return (
      <div>
          <nav>
            <Link to="/register">Sign Up</Link>
            <Link to="/login">Log in</Link>
            <Link to='/user_page'>My Recipes</Link>
          </nav>
      </div>
    );
}

export default Nav;