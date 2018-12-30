import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchFood } from '../actions';
import { Input, Icon } from 'semantic-ui-react';

class searchForm extends Component {
    state = {
        searchText: "",
    }

    render() {
        return (
            <div className="row">
                <Input
                    placeholder="search food..."
                    type="text"
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onFormChange}
                    size="tiny"
                />
                <Icon 
                    circular
                    inverted
                    color="teal"
                    name="search"
                    size="large"
                    onClick={this.handleSearchClick}
                    className="searchbutton"
                 />
                
            </div>
        )
    }

    onFormChange = (event) => {
        this.setState({
            searchText: event.target.value,
        })
    }

    handleSearchClick = () => {
        const params2 = Object.assign({}, this.props.params2);
        if (this.state.searchText) { 
            params2.q = this.state.searchText;
            this.props.searchFood(params2);
        }
        this.setState({
            searchText: "",  
        })
    }

}


const mapStateToProps = (state) => {
    return {
        params2: state.params2
    }
}

export default connect(mapStateToProps, { searchFood })(searchForm);


