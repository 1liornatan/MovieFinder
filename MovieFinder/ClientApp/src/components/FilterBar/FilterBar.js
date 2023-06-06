import {Component} from "react";
import "./FilterBar.css"

export class FilterBar extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            filterByYear: -1
        }
    }
    
    onInputChange = (event) => {
        if(event.target.value > 0)
            this.setState({filterByYear: event.target.value});
    }

    resetFilter = () => {
        this.props.onFilterSubmit(-1)
    }
    
    doFilter = () => {
        this.props.onFilterSubmit(this.state.filterByYear)
    }
    
    render() {
        return (
            <div className="filter-bar">
                <label htmlFor="filter-year-input" className="filter-label">Filter by Year</label>
                <br />
                <input
                    type="number"
                    id="filter-year-input"
                    value={this.state.term}
                    onChange={this.onInputChange}
                    className="filter-input"
                />
                <br/>
                <button
                    onClick={this.doFilter}
                    className="filter-button"
                    type="submit"
                >
                    Filter
                </button>
                <button
                    onClick={this.resetFilter}
                    className="filter-button reset"
                    type="reset"
                >
                    Reset
                </button>
            </div>
        );
    }
}
