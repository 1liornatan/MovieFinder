import React, { Component } from 'react';
import SearchBar from "./SearchBar";
import {MovieList} from "./MovieList";
import {Paginator} from "./Paginator";
export class Home extends Component {
    static displayName = Home.name;

    static popularMovies = [
        { imdbID: 'tt0120338' },
        { imdbID: 'tt0083866' },
        { imdbID: 'tt0032138' },
        { imdbID: 'tt0076759' },
        { imdbID: 'tt0167260' },
        { imdbID: 'tt0029583' },
        { imdbID: 'tt0103064' },
        { imdbID: 'tt0110357' },
        { imdbID: 'tt0068646' },
    ];

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            movies: Home.popularMovies,
            results: Home.popularMovies.length,
            popular: true,
        };
    }

    onMovieSelect = (movie) => {
        this.setState({ selectedMovie: movie });
    };

    onTermSubmit = async (term) => {
        if (this.state.isSearching) {
            return; // Ignore the submission if a search is already in progress
        }

        try {
            this.setState({ title: term, isSearching: true }); // Set the flag to indicate a search is in progress
            await this.requestMovies(term, 1);
        } catch (e) {
            console.log('Encountered an error:', e);
        } finally {
            this.setState({ isSearching: false }); // Reset the flag once the search is complete
        }
    };

    requestMovies = async (title, page) => {
        console.log(title, page);
        const response = await fetch(`movie/${title}/${page}`);
        const data = await response.json();

        const movies = data?.data?.search || [];
        const results = data?.data?.totalResults || 0;

        console.log('Results:' + results);

        this.setState({ movies: movies, results: results, popular: false });
    };
    
    render() {
        return (
            <div>
                <h1>Welcome To Movie Finder!</h1>
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <br />
                {this.state.popular ? (
                    <p>Popular Movies:</p>
                ) : (
                    <div>
                        <p>Search Results:</p>
                        <Paginator
                            results={this.state.results}
                            requestMovies={this.requestMovies}
                            title={this.state.title}
                        />
                    </div>
                )}
                <MovieList movies={this.state.movies} results={this.state.results} />
            </div>
        );
    }
}