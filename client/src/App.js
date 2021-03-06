import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import Home from './Pages/Home.js';
import Auth from './Pages/Auth'
import CreateMemory from './Pages/CreateMemory';
import PostStore from './context/PostStore';
import ProtectedRoute from './components/ProtectedRoute';
import PageNotFound from './components/PageNotFound';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

const App = () => {
    return (
        <PostStore>
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route exact component={Home} path="/home" />

                    <Route exact component={Auth} path="/auth" />
                    <ProtectedRoute exact component={CreateMemory} path="/createMemories" />
                    <Route exact component={ForgotPassword} path="/auth/forgotPassword" />
                    <Route exact component={ResetPassword} path="/auth/resetPassword/:tokenid" />
                    <Route component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        </PostStore>
    )
}

export default App
