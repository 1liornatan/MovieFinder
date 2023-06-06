import React, {Component} from "react";
import "./MovieList.css"

/*
    This component creates the movie list and displays
    all the information about the movie.
*/
export class MovieList extends Component {
    static displayName = MovieList.name;
    
    constructor(props) {
        super(props);
        this.state = {
            movies: props.movies,
            results: props.results,
            isLoading: false,
            expandedMovie: null
        }
    }

    componentDidMount() {
        this.loadMovies(this.state.movies, this.state.results).then(r =>
            console.log('Loaded popular movies successfully'))
    }

    componentDidUpdate(prevProps) {
        if (this.props.movies !== prevProps.movies) {
            this.loadMovies(this.props.movies, this.props.results).then(r =>
            console.log('Loaded Searched Movies'));
        }
    }
    loadMovies = async (movies, results) => {
        if (this.state.isLoading) {
            return; // Ignore the submission if a search is already in progress
        }
        
        try {
            this.setState({movies: [], results: results, isLoading: true})
            movies.map(async (item) => {
                const movieDataResponse = await fetch(`movie/${item.imdbID}`);
                const movieData = await movieDataResponse.json();

                this.setState((prevState) => {
                    return {
                        movies: [...prevState.movies, movieData]
                    }
                });
            })
        } catch (e) {
            console.log(e);
        } finally {
            this.setState({ isLoading: false })
        }
    };

    handleMovieClick = (movie) => {
        this.setState((prevState) => ({
            expandedMovie: prevState.expandedMovie === movie ? null : movie
        }));
    };
    render() {
        return (
            <div>
                {
                    this.state.results > 0 ? this.state.movies.map((item, i) => (
                    <div key={i} className={`movie-container ${this.state.expandedMovie === item ? 'expanded' : ''}`}>
                        <div
                            className={`row movie-row ${this.state.expandedMovie === item ? 'expanded' : ''}`}
                            onClick={() => this.handleMovieClick(item)}
                        >
                            <div className="col-md-1">
                                <img src={item.poster} alt={item.title} className="img-fluid" />
                            </div>
                            <div className="col-md-3">{item.title}</div>
                            <div className="col-md-6">{item.plot}</div>
                            <div className="col-md-2">{item.imdbRating}</div>
                        </div>
                        {this.state.expandedMovie === item && (
                            <div className="row movie-details">
                                <div className="col-md-3">Actors: {item.actors}</div>
                                <div className="col-md-3">Genre: {item.genre}</div>
                                <div className="col-md-3">Released at: {item.released}</div>
                                <div className="col-md-3">Director: {item.director}</div>
                            </div>
                        )}
                    </div>
                        )) : (<p>No movies were found!</p>)
                }
            </div>
        );
    }
}