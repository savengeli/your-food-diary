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
} from '../actions/types'

const API_KEY = 'QQUpfsc4c3KzCh8gANddt9WpdODcF2fVtLnzAUJk';

const initState = {
    // parameters to find food info:
    params: {
        api_key: API_KEY,
        ndbno: "",
    },
    // parameters for search:
    params2: {
        api_key: API_KEY,
        q: "",
        ds: "Standard Reference",
        max: 20,
    },
    searchText: "",
    searchResultList: [],
    usersFoodList: [],
    foodToBeModified: "",
    isModalOpen: false,
    isCFmodalOpen: false,
    zeroSearchResults: false,
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case SEARCH_FOOD:
            return {
                ...state,
                searchResultList: action.payload,
                searchText: action.searchText,
                zeroSearchResults: false,
            }
        case ZERO_RESULTS:
            return {
                ...state,
                searchText: action.searchText,
                zeroSearchResults: true,
                searchResultList: [],
            }
        case SELECT_FOOD:
            let updatedList = [...state.usersFoodList, action.payload];
            return {
                ...state,
                usersFoodList: updatedList,
                isCFmodalOpen: false,
            }
        case SUBMIT_AMOUNT:
            let copyOfFoodList = [...state.usersFoodList];
            // The index number of this food:
            let index = copyOfFoodList.findIndex(food => food.key === action.payload.key);
            // Replace the modified row in the table:
            copyOfFoodList.splice(index, 1, action.payload);
            return {
                ...state,
                usersFoodList: copyOfFoodList,
                isModalOpen: false,
            }
        case ADD_CUSTOM_FOOD:
            let newList = [...state.usersFoodList, action.payload];
            return {
                ...state,
                usersFoodList: newList,
                isCFmodalOpen: false,
            }
        case HANDLE_AMOUNT_CLICK:
            return {
                ...state,
                foodToBeModified: action.payload,
                isModalOpen: true,
            }
        case HANDLE_REMOVE_CLICK:
            let foodListCopy = [...state.usersFoodList];
            foodListCopy.splice(action.index, 1);
            return {
                ...state,
                usersFoodList: foodListCopy
            }
        case OPEN_MODAL:
            return {
                ...state,
                isModalOpen: true,
            }
        case CLOSE_MODAL:
            return {
                ...state,
                isModalOpen: false,
            }
        case OPEN_CUSTOMFOOD_MODAL:
            return {
                ...state,
                isCFmodalOpen: true,
            }
        case CLOSE_CUSTOMFOOD_MODAL:
            return {
                ...state,
                isCFmodalOpen: false,
            }
        default: return state;
    }
}

export default reducer;