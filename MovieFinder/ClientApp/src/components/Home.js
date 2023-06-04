import React, { Component } from 'react';
import SearchBar from "./SearchBar";

export class Home extends Component {
  static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            results: 0
        }
    }

  
  onMovieSelect = (movie) => {
      this.setState({selectedMovie: movie})
  }
    onTermSubmit = async (term) => {
        if (this.state.isSearching) {
            return; // Ignore the submission if a search is already in progress
        }

        try {
            this.setState({ isSearching: true }); // Set the flag to indicate a search is in progress
            const response = await fetch(`movie/${term}/1`);
            const data = await response.json();

            const movies = data?.data?.search || [];
            const results = data?.data?.totalResults || 0;
            
            this.setState({ movies: [], results})
            movies.map(async (item) => {
                    try {
                        const movieDataResponse = await fetch(`movie/${item.imdbID}`);
                        const movieData = await movieDataResponse.json();

                        this.setState((prevState) => {
                            return {
                                movies: [...prevState.movies, movieData]
                            }
                        });
                    } catch (e) {
                        console.log(e)
                    }
                }
            );
        } catch (e) {
            console.log('Encountered an error:', e);
        } finally {
            this.setState({ isSearching: false }); // Reset the flag once the search is complete
        }
    };

    render() {
    return (
        <div>
            <h1>Welcome To Movie Finder!</h1>
            <SearchBar onFormSubmit={this.onTermSubmit}/>
            <p>Movies:</p>
            {this.state.movies.length > 0 ? (
                <ul>
                    {this.state.movies.map((item, i) => (
                        <li key={i}>{item.title} - {item.plot}</li>
                    ))}
                </ul>
            ) : (
                <p>No movies were found.</p>
            )}
            {/*<PopularMoviesCatalog/>*/}
        </div>
/*      <div>
        <h1>Hello, world!</h1>
        <p>Welcome to your new single-page application, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>To help you get started, we have also set up:</p>
        <ul>
          <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
          <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
          <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
        </ul>
        <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
      </div>*/
    );
  }
}
