import React, { Component } from 'react';
import '../../css/App.css';

class Drives extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            drives : []
        }
    }

    const moviesItems = movies !== null ? movies.map(movie => (
            <Link to={`/detail/${movie.id}`} className="main-carousel__item-link" key={movie.id}>
                <div className="main-carousel__item">
                    <img
                        src={movie.backdrop_path !== null ? `http://image.tmdb.org/t/p/w342/${movie.backdrop_path}` : ''}
                        className="main-carousel__item-img"
                        alt={movie.original_title ? movie.original_title : movie.original_name}/>
                    <h4 className="main-carousel__item-title">
                        {movie.original_title ? movie.original_title : movie.original_name}
                    </h4>
                </div>
            </Link>
        )) :
    null;

    componentDidMount() {
        this.getDrives();
    }

    async getDrives() {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
            };
        
        await fetch('http://localhost:8000/drives/', requestOptions)
            .then(response => {
                response.json().then(data => {
                    this.state.drives = data;
                });
                
                
        }) 
    }    

    render() {
        return <div>{this.state.drives}</div>  
    }
}

export default Drives;