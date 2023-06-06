import React, { Component } from 'react';
import SearchBar from "./SearchBar/SearchBar";
import {FilterBar} from "./FilterBar/FilterBar";
import {MovieList} from "./MovieList/MovieList";
import {Paginator} from "./Paginator/Paginator";

/*
    This is the main page for the app,
    it creates all the components required for the Movie Finder app
*/
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
            year: -1,
            isFiltering: false
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
        let url = `movie/search?id=${title}&page=${page}`;
        if(this.state.year > 0) url = url + `&year=${this.state.year}`
        
        const response = await fetch(url);
        const data = await response.json();

        const movies = data?.data?.search || [];
        const results = data?.data?.totalResults || 0;

        console.log('Results:' + results);

        this.setState({ movies: movies, results: results, popular: false });
    };
    
    onFilteredSearchSubmit = async (year) => {
        if(this.state.popular)
            return; // cannot filter at popular movies
        
        let filter = false;
        
        if(year > 0)
            filter = true;
        
        await this.setState( { year: year, isFiltering: filter })
        await this.onTermSubmit(this.state.title, year)
    }
    render() {
        return (
            <div>
                <h1>Welcome To Movie Finder!</h1>
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <FilterBar onFilterSubmit={this.onFilteredSearchSubmit}/>
                <br />
                Status:
                {
                    this.state.isFiltering ?
                        (<p>Filtering by Year [{this.state.year}]</p>)
                        :
                        (<p>Not Filtering</p>)
                }
                <br/>
                {this.state.popular ? (
                    <p>Popular Movies:</p>
                ) : (
                    <div>
                        <p>Search Results:</p>
                    </div>
                )}
                <MovieList movies={this.state.movies} results={this.state.results} />
                <br/>
                <Paginator
                    results={this.state.results}
                    requestMovies={this.requestMovies}
                    title={this.state.title}
                />
            </div>
        );
    }
}