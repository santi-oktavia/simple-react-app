import React from 'react';
import { BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect, 
  HashRouter, 
  NavLink
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from "./Home/Home.js";
import Pokemon from "./Pokemon/Pokemon.js";
import DetailPokemon from './DetailPokemon/DetailPokemon.js';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <ul>
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink exact to="/pokemon">Pokemon</NavLink></li>
          </ul>
        </header>
        <div className="content">
          <Route exact path="/" component={Home}/>
          <Route exact path="/pokemon" component={Pokemon}/>
          <Route path="/detailPokemon/:pokemonName" component={DetailPokemon} />
        </div>
      </div>
    </HashRouter>
    
  );
}

export default App;
