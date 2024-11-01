// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Forum from './components/Forum';
import Register from './components/Register';

import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forum" element={<Forum />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
