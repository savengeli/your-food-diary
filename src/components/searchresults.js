import React from 'react';
import { connect } from 'react-redux';
import { selectFood } from '../actions';

const SearchResults = (props) => {
    // Make a list of search results and let user choose one of them:
    let listItems = "";
    if (props.searchResultList.length > 0) {
        listItems = props.searchResultList.map((food) =>
            <li
                key={food.ndbno}
                onClick={() => props.selectFood(food.ndbno, props.params, props.usersFoodList)}
            >
                {food.name}
            </li>
        )
        return (
            <div className="searchResultList">
                <h3>Search results for "{props.searchText}"</h3>
                <p className="smalltext">from  USDA Food Composition Databases.</p>
                <h4>Pick a food to add to your food diary:</h4>
                {listItems}
            </div>
        )
    } else if (props.zeroSearchResults) {
        return (
            <div className="searchResultList">
                <h3>Your search for "{props.searchText}" returned no results.</h3>
                <h4>Try another search text.</h4>
            </div>
        )
    } else {
        return (<p></p>)
    }

}

const mapStateToProps = (state) => {
    return {
        params: state.params,
        searchResultList: state.searchResultList,
        usersFoodList: state.usersFoodList,
        searchText: state.searchText,
        zeroSearchResults: state.zeroSearchResults,
    }
}

export default connect(mapStateToProps, { selectFood })(SearchResults);
