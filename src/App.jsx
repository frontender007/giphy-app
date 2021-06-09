import React from 'react';
import Gif from './components/Gif';
import './App.css';

const App = () => {
    return (
        <div className="container">
            <h1 className="text-center">Giphygram</h1>
            <Gif />
        </div>
    );
}

export default App;