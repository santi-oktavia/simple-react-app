import React, {Component} from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import "./DetailPokemon.css";

export default class DetailPokemon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            linkReady: false
        }
    }
  
    //function which is called the first time the component loads
    componentDidMount() {
      this.getDetailPokemon(this.props.url);

    }

    //Function which is called whenver the component is updated
    componentDidUpdate(prevProps) {

        //get Customer Details only if props has changed
        if (this.props.url !== prevProps.url) {
            this.getDetailPokemon(this.props.url)
        }
    }
  
    getDetailPokemon = (url) => {
        axios.get(url).then(response => {
            this.setState({
                detailPokemon: response.data,
                linkReady: true,
                downloadedData: "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response.data))
            })
            // console.log(this.state.detailPokemon);
        })
        .catch(err => {
            console.log('11', err)
        })
    };

  
    
    render() {        
        if (!this.state.detailPokemon)
            return (<p>Loading data</p>)
        return (
            <div className="detail-container">
                <div className="title-wrapper"><u>{this.state.detailPokemon.name} Description</u></div>
                <div className="detail-wrapper">
                    <table>
                        <tbody>
                            <tr>
                                <th className="property">Name</th>
                                <th className="property">:</th>
                                <th className="text-uppercase">{this.state.detailPokemon.name}</th>
                            </tr>
                            <tr>
                                <th className="property">Base Experience</th>
                                <th className="property">:</th>
                                <th>{this.state.detailPokemon.base_experience}</th>
                            </tr>
                            <tr>
                                <th className="property">Abilities</th>
                                <th className="property">:</th>
                                <th>
                                    {
                                        this.state.detailPokemon.abilities.slice(0, 5).map(ability => 
                                        <li key={ability.ability.url} className="" >
                                            {ability.ability.name}
                                        </li>)
                                    }
                                </th>
                            </tr>
                            <tr>
                                <th className="property">Base Stat</th>
                                <th className="property">:</th>
                                <th>
                                    {
                                        this.state.detailPokemon.stats.slice(0, 5).map(stat => 
                                        <li key={stat.base_stat} className="" >
                                            {stat.stat.name}
                                        </li>)
                                    }
                                </th>
                            </tr>
                            <tr>
                                <th className="property">Moves</th>
                                <th className="property">:</th>
                                <th>
                                    {
                                        this.state.detailPokemon.moves.slice(0, 5).map(move => 
                                        <li key={move.move.url} className="" >
                                            {move.move.name}
                                        </li>)
                                    }
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                    {
                    this.state.linkReady ?
                        <button className="btn btn-primary"><a className="download-link" href={`data: ${this.state.downloadedData}`} 
                        download={`${this.state.detailPokemon.name}.json`}>Download JSON</a></button>
                        : <button onClick={this.download}> Prepare link </button>
                    }
                    </div>
                </div>
            </div>
        )
  
  }

}
