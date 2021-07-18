import React from 'react';
import { BrowserRouter , Redirect, Route, Switch } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import Home from './Pages/Home.js';
import Auth from './Pages/Auth'
import CreateMemory from './Pages/CreateMemory';
const App = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route exact component={Home} path ="/home"/>
            </Switch>
            <Route exact component={Auth} path ="/auth"/>
            <Route exact component={CreateMemory} path ="/createMemories"/>
        </BrowserRouter>
    )
}

export default App
