import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import AllRecipes from './components/AllRecipes';
import UserPage from './components/UserPage';
import AddRecipe from './components/AddRecipe';
import Nav from './components/Nav';
import UserNav from './components/UserNav';


function App() {
  return (
      <Router>
        <div>
          <Route exact path='/'>
            <Nav />
            <AllRecipes />
          </Route>
          <Route exact path='/login'>
            <Nav />
            <LoginForm />
          </Route>
          <Route exact path='/register'>
            <Nav />
            <RegisterForm />
          </Route>
          <Switch>
            <PrivateRoute exact path='/user_page'>
              <UserNav />
              <UserPage />
            </PrivateRoute>
            <PrivateRoute exact path='/add_recipe'>
              <UserNav />
              <AddRecipe />
            </PrivateRoute>
            {/* <PrivateRoute exact path='/user_recipe/:id'>
              <UserNav />
            </PrivateRoute> */}
          </Switch>
        </div>
      </Router>
  );
}

export default App;
