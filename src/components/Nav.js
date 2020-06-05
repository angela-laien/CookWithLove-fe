import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const companyLogo = require('../Instacook.png');

function Nav() {
    return (
      <PublicNav>
          <Navigation>
            <Img 
              src={companyLogo}
              className='companylogo'
              alt='companylogo'
            />
            <Link className='navText' to='/register' style={{ textDecoration: 'none' }}>
              <A>Sign Up</A>
            </Link>
            <Link className='navText' to='/login' style={{ textDecoration: 'none' }}>
              <A>Login</A>
            </Link>
            <Link className='navText' to='/user_page' style={{ textDecoration: 'none' }}>
              <A>My Recipes</A>
            </Link>
          </Navigation>
      </PublicNav>
    );
}

const PublicNav = styled.div`
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
    padding: 10px 0px;
`;

export default Nav;