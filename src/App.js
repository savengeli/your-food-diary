import React, { Component } from 'react';
import './App.css';
import CustomFood from './components/customfood';
import SearchForm from './components/searchform';
import SearchResults from './components/searchresults';
import FoodTable from './components/foodtable';
import AmountModal from './components/amountmodal';

class App extends Component {

  render() {
    return (
      <div>
        <div className="maincontainer">
          <div className="contents">
            <h1 className="header">Your food diary</h1>
            <p className="smallheader">For calories and macronutrients calculation</p>
            <div className="row">
              <div className="leftsidebar">
                <CustomFood />
                <p className="info">Or search food from the databases:</p>
                <SearchForm />
                <SearchResults />
              </div>
              <div>
                <FoodTable />
              </div>
            </div>
          </div>
        </div>
        <p className="credits">Made by Essi Saloranta</p>
        <AmountModal />
      </div>
    );
  }
}

export default App;
