import React, {Component} from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import DetailPokemon from '../DetailPokemon/DetailPokemon.js';

export default class Pokemon extends Component {

    constructor(props) {
      super(props)
      this.state = {
        selectedPokemon: ""
      }
    }
  
    //function which is called the first time the component loads
    componentDidMount() {
      this.getListPokemon();
    }
  
    getListPokemon = () => {
        axios.get('https://pokeapi.co/api/v2/pokemon').then(response => {
          this.setState({
            listPokemon: response.data,
            selectedPokemon: response.data.results[0].url,
            pageCount: response.data.count/20
          });
        })        
        .catch(err => {
          console.log('11', err)
      })
    };
    
    render() {
      if (!this.state.listPokemon)
        return (<p>Loading data</p>)
      return (<div className="row addmargin">
        <div className="col-md-6 list-pokemon">
            <h1>List Pokemon</h1>
            <ol>
                {
                    this.state.listPokemon.results.map(pokemon => <li key={pokemon.name} className="centeralign" 
                        onClick={() => this.setState({selectedPokemon: pokemon.url})}>
                        {/* <link exact to="/detailPokemon/ditto"> */}
                    {pokemon.name}
                </li>)
                }
            </ol>
          
        </div>
        <div className="col-md-6 detail-pokemon">
                <DetailPokemon url={this.state.selectedPokemon}/>
        </div>
      </div>)
    }
  
  }
