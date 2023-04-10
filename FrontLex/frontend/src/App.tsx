import React from 'react';
import logo from './logo.svg';
import './App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import VideoGames from "./Pages/VideoGames";
import Filter from "./Pages/Filter";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" Component={VideoGames}/>
                <Route path="/filter" Component={Filter}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
