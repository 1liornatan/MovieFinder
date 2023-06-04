import {Component} from "react";

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
                        <label htmlFor="search-input">Movie Search</label>
                        <br />
                        <input
                            type="text"
                            id="search-input"
                            value={this.state.term}
                            onChange={this.onInputChange}
                        />
                    </div>
                </form>
            </div>
        )
    }
}
