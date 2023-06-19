import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        <input type="radio" id="movies" name="type" value="movies" defaultChecked/>MOVIES
        <input type="radio" id="series" name="type" value="series"/>SERIES
    </div>
  );
}

export default App;
