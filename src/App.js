import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import AllRecipes from './components/AllRecipes';
import UserPage from './components/UserPage';
import AddRecipe from './components/AddRecipe';
import Nav from './components/Nav';
import UserNav from './components/UserNav';
import { ToastProvider } from "react-toast-notifications";

function App() {
  const [toast, setToast] = useState(false);
  return (
      <Router>
        <div>
          <Route exact path='/'>
            <Nav />
            <AllRecipes />
          </Route>
          <Route exact path='/login'>
            <Nav />
            <ToastProvider>
              <LoginForm toast={toast} setToast={setToast}/>
            </ToastProvider>
          </Route>
          <Route exact path='/register'>
            <Nav />
            <ToastProvider>
              <RegisterForm toast={toast} setToast={setToast} />
            </ToastProvider>
          </Route>
          <Switch>
            <PrivateRoute exact path='/user_page'>
              <ToastProvider>
                <UserNav />
                <UserPage toast={toast} setToast={setToast}/>
              </ToastProvider>
            </PrivateRoute>
            <PrivateRoute exact path='/add_recipe'>
              <UserNav />
              <ToastProvider>
                <AddRecipe toast={toast} setToast={setToast}/>
              </ToastProvider>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
