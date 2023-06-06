import {Component} from "react";
import {Button} from "reactstrap";
import "./SearchBar.css"

export default class SearchBar extends Component {
    state = { term:'' };
    onInputChange = (event) => {
        this.setState({term: event.target.value});
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onFormSubmit(this.state.term)
    };
    render() {
        return (
            <div className="search-bar">
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-search">
                        <label htmlFor="search-input" className="search-label">Movie Search:</label>
                        <input
                            type="text"
                            id="search-input"
                            value={this.state.term}
                            onChange={this.onInputChange}
                            className="search-input"
                        />
                        <button
                            type="submit"
                            className="search-button"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
