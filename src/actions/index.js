import {
    SEARCH_FOOD,
    ZERO_RESULTS,
    SELECT_FOOD,
    SUBMIT_AMOUNT,
    HANDLE_AMOUNT_CLICK,
    HANDLE_REMOVE_CLICK,
    OPEN_MODAL,
    CLOSE_MODAL,
    OPEN_CUSTOMFOOD_MODAL,
    CLOSE_CUSTOMFOOD_MODAL,
    ADD_CUSTOM_FOOD,
} from './types';
import axios from 'axios';

const ROOT_URL = 'https://api.nal.usda.gov/ndb/V2/reports';
const ROOT_URL2 = 'https://api.nal.usda.gov/ndb/search';

// Get the search results from the database:
export const searchFood = (parameters) => {
    return dispatch => {
        axios.get(ROOT_URL2, { params: parameters })
            .then(response => {
                if (response.data.list) {
                    dispatch({
                        type: SEARCH_FOOD,
                        payload: response.data.list.item,
                        searchText: response.data.list.q,
                    })
                } else if (response.data.errors) {
                    dispatch({
                        type: ZERO_RESULTS,
                        searchText: response.config.params.q,
                    })
                }
            })
            .catch(err => console.log(err))
    }
}

// Get the selected food's details from the database:
export const selectFood = (ndbno, parameters, foodList) => {
    let key = generateKey(foodList);
    const parametersCopy = Object.assign({}, parameters);
    parametersCopy.ndbno = ndbno;
    return dispatch => {
        axios.get(ROOT_URL, { params: parametersCopy })
            .then(response => {
                // We don't need all that data. Let's simplify it:
                let simplifiedFoodData = simplifyFoodData(response.data.foods[0].food, key);
                dispatch({
                    type: SELECT_FOOD,
                    payload: simplifiedFoodData,
                })
            })
            .catch(err => console.log(err))
    }
}

// Generate an object containing only those food details that we need:
const simplifyFoodData = (data, key) => {
    const foodDetails = {
        amount: 100,    // Amount in grams
        key: key,
        name: data.desc.name,
        kcal: data.nutrients[1].value,
        fat: data.nutrients[3].value,
        prot: data.nutrients[2].value,
        carbs: data.nutrients[4].value,
        sugar: data.nutrients[6].value,
        // We need to save nutrients per 100 g data for later use:
        per100g: {
            kcal: data.nutrients[1].value,
            fat: data.nutrients[3].value,
            prot: data.nutrients[2].value,
            carbs: data.nutrients[4].value,
            sugar: data.nutrients[6].value,
        },
    }
    return foodDetails;
}

export const addCustomFood = (foodData, usersFoodList) => {
    const data = Object.assign({}, foodData);
    delete data.warning; // no need for this object item anymore
    data.key = generateKey(usersFoodList);
    // Save per 100g values for later use and round their decimals (max 2 decimals)
    data.per100g.kcal = data.kcal;
    data.per100g.fat = parseFloat(data.fat).toFixed(2);
    data.per100g.prot = parseFloat(data.prot).toFixed(2);
    data.per100g.carbs = parseFloat(data.carbs).toFixed(2);
    data.per100g.sugar = parseFloat(data.sugar).toFixed(2);
    return {
        type: ADD_CUSTOM_FOOD,
        payload: data,
    }
}

const countNutrients = (amount, per100gValue) => {
    let result = 0; // this is used if custom food nutrient value is not set (it is NaN)
    if (!isNaN(per100gValue)) {
        // Count the value and round it, max 1 decimals:
        result = +(parseFloat(amount / 100 * per100gValue)).toFixed(1);
    }
    return result;
}

export const submitAmount = (amount, foodData) => {
    // Make a copy of the food data and change the amount value of it:
    const data = Object.assign({}, foodData);
    console.log(data);
    data.amount = amount;
    data.kcal = countNutrients(amount, data.per100g.kcal);
    data.carbs = countNutrients(amount, data.per100g.carbs);
    data.fat = countNutrients(amount, data.per100g.fat);
    data.prot = countNutrients(amount, data.per100g.prot);
    data.sugar = countNutrients(amount, data.per100g.sugar);
    return {
        type: SUBMIT_AMOUNT,
        payload: data,
    }
}

const generateKey = (foodList) => {
    let key = 1;
    if (foodList.length > 0) {
        key = foodList[foodList.length - 1].key + 1;
    }
    return key;
}

export const handleAmountClick = (data) => {
    return {
        type: HANDLE_AMOUNT_CLICK,
        payload: data,
    }
}

export const handleRemoveClick = (index) => {
    return {
        type: HANDLE_REMOVE_CLICK,
        index: index,
    }
}

export const openModal = () => {
    return {
        type: OPEN_MODAL,
    }
}

export const closeModal = () => {
    return {
        type: CLOSE_MODAL,
    }
}

export const openCFmodal = () => {
    return {
        type: OPEN_CUSTOMFOOD_MODAL,
    }
}

export const closeCFmodal = () => {
    return {
        type: CLOSE_CUSTOMFOOD_MODAL,
    }
}
