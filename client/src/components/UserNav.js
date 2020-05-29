import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const companyLogo = require('../Instacook.png');

function UserNav() {
    const logout = () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
      };
    return (
        <UserNavContainer>
            <Navigation>
                <Link to='/'>
                    <Img 
                        src={companyLogo}
                        className='companylogo'
                        alt='companylogo'
                    />
                </Link>
                <Link className='navText' to='/add_recipe' style={{ textDecoration: 'none' }}>
                    <A>Add Recipe</A>
                </Link>
                <Link className='navText' to='/user_page' style={{ textDecoration: 'none' }}>
                    <A>My Recipes</A>
                </Link>
                <Link className='navText' onClick={logout} to='/' style={{ textDecoration: 'none' }}>
                    <A>Logout</A>
                </Link>
            </Navigation>
        </UserNavContainer>
    )
}

const UserNavContainer = styled.div`
    display: flex;
    width: 100%;
`;

const Navigation = styled.nav`
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    background-color: rgb(255,135,180);
    align-items: center;
`;

const A = styled.a`
    color: white;
    &:hover {
        color: rgb(255,20,147);
      }
    font-weight: bold;
`;

const Img = styled.img`
    width: 90px;
    padding: 10% 0%;
`;

export default UserNav;