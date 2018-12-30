import React from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { ReactTableDefaults } from "react-table"
import { handleAmountClick, handleRemoveClick } from '../actions';
import { Popup, Icon } from 'semantic-ui-react'
import _ from 'lodash';
import 'react-table/react-table.css';
import FoodTableCss from './foodtable.module.css';

Object.assign(ReactTableDefaults, {
    showPagination: false,
    showPaginationBottom: false,
    minRows: 0,
    defaultPageSize: 30,
});

const FoodTable = (props) => {
    if (props.foodList.length > 0) {
        const data = props.foodList;
        const columns = [{
            Header: 'Amount',
            accessor: 'amount',
            maxWidth: 80,
            Cell: (row) => (
                <span className="AmountColumn">
                    {row.value} g
                    &nbsp;
                    <Popup
                        trigger={<Icon name='edit' color='teal' />}
                        position='right center'
                        content='Edit amount'
                    />
                </span>
            )
        }, {
            Header: 'Name',
            accessor: 'name',
            minWidth: 250,
            Cell: (row) => (
                <span>
                    <Popup
                        trigger={<span className="FoodName">{row.value}</span>}
                        position='right center'
                        content={row.value}
                    />
                </span>
            ),
            Footer: (
                <span>
                    Total:
                </span>
            )
        }, {
            Header: 'kcal',
            accessor: 'kcal',
            maxWidth: 60,
            Footer: (
                <span>
                    {_.round(_.sum(_.map(data, d => Number(d.kcal))), 0)}
                </span>
            )
        }, {
            Header: 'Fat, g',
            accessor: 'fat',
            maxWidth: 60,
            Footer: (
                <span>
                    {_.round(_.sum(_.map(data, d => Number(d.fat))), 1)} g
                    </span>
            )
        }, {
            Header: 'Protein, g',
            accessor: 'prot',
            maxWidth: 60,
            Footer: (
                <span>
                    {_.round(_.sum(_.map(data, d => Number(d.prot))), 1)} g
                    </span>
            )
        }, {
            Header: 'Carbs, g',
            accessor: 'carbs',
            maxWidth: 60,
            Footer: (
                <span>
                    {_.round(_.sum(_.map(data, d => Number(d.carbs))), 1)} g
                    </span>
            )
        }, {
            Header: 'Sugars, g',
            accessor: 'sugar',
            maxWidth: 60,
            Footer: (
                <span>
                    {_.round(_.sum(_.map(data, d => Number(d.sugar))), 1)} g
                    </span>
            )
        }, {
            Header: 'Remove?',
            maxWidth: 70,
            Cell: () => (
                <span>
                    <Popup
                        trigger={<Icon name='remove circle' color='red' />}
                        position='right center'
                        content='Remove food'
                    />
                </span>
            )
        }]
        let index = null;
        let index2 = null;
        let clickedFoodData = null;

        return (
            <ReactTable className={FoodTableCss.FoodTable}
                getTdProps={(state, rowInfo, column, instance) => {
                    return {
                        style: {
                            cursor: column.Header === "Amount" ? "pointer" : "auto"
                        },
                        onClick: (e, handleOriginal) => {
                            if (column.Header === "Amount") {
                                index = rowInfo.index; // find out the index number of the clicked food
                                clickedFoodData = instance.resolvedData[index]; // get the data of the clicked food
                                // Open AmountModal and give food data and index num to it:
                                props.handleAmountClick(clickedFoodData);
                            }
                            if (column.Header === 'Remove?') {
                                index2 = rowInfo.index;
                                props.handleRemoveClick(index2);
                            }
                            if (handleOriginal) {
                                handleOriginal();
                            }
                        }
                    }
                }
                }
                data={data}
                columns={columns}
            />
        )
    } else {
        return (
            <div className={FoodTableCss.EmptyTable}>
                <h3>Your food diary is empty.</h3>
                <p> Add some food to your diary by using search<br />
                    to find food from the USDA Food Composition Databases<br />
                    or by adding your custom food.
                </p>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        foodList: state.usersFoodList,
        foodToBeModified: state.foodToBeModified,
    }
}

export default connect(mapStateToProps, { handleAmountClick, handleRemoveClick })(FoodTable);