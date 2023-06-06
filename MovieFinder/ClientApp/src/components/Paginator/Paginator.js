import {Component} from "react";
import './Paginator.css'

export class Paginator extends Component {
    constructor(props) {
        super(props);
        
        let pages = this.getNumberOfPages(props.results)
        
        this.state = {
            title: props.title,
            pages: pages,
            currentPage: 1
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.title !== prevProps.title || this.props.results !== prevProps.results) {
            this.setState({
                title: this.props.title,
                pages: this.getNumberOfPages(this.props.results),
                currentPage: 1
            });
        }
    }

    getNumberOfPages = (results) => {
        let pages = results / 10;
        if (pages % 10 > 0)
            pages = pages + 1;
        
        return pages;
    }
    handleClick = (page) => {
        this.setState({ currentPage: page })
        this.props.requestMovies(this.state.title, page)
    }
    renderButtons = () => {
        let k = this.state.pages;
        const buttons = [];
        for (let i = 1; i <= k; i++) {
            buttons.push(
                <div className="col-md-auto" key={'button-page-' + i}>
                    <button
                        className={`paginator-button ${i === this.state.currentPage ? 'active' : ''}`}
                        onClick={() => this.handleClick(i)}
                        disabled={i === this.state.currentPage}>
                        {i}
                    </button>
                </div>
            );
        }
        return buttons;
    };
    
    render() {
        return (
            <div>
                <div className="row" id="buttons-row">
                    {this.renderButtons(this.state.pages)}
                </div>
            </div>
        );
    }


}