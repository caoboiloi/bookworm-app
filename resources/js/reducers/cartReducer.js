
import { ADD_PRODUCT_TO_CART,
    UPDATE_PRODUCT_CART_BY_ID,
    DELETE_PRODUCT_CART_BY_ID,
    IS_VALID_PRODUCT,
    DELETE_ALL_PRODUCT_CART } from "../const/index";

import { KEY_CONFIG_CART } from "../utils/config";

function updateAmountProductCart(array, product) {
    for(let i = 0; i < array.length; i++){
        if(array[i].idBook === product.idBook){
            array[i].amount += product.amount;
            return true;
        }
    }
    return false;
}

const filterReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            let newData = [];
            let item = action.data;
            if (localStorage.getItem(KEY_CONFIG_CART) != null) {
                // console.log('check cart có sản phẩm');
                newData = JSON.parse(localStorage.getItem(KEY_CONFIG_CART));
                if (updateAmountProductCart(newData, item)) {
                    // console.log('check sản phẩm có tồn tại');
                    localStorage.setItem(KEY_CONFIG_CART, JSON.stringify(newData));
                    return [
                        ...newData
                    ];
                }
            }
            // console.log('check cart không sản phẩm');
            newData.push(item);
            localStorage.setItem(KEY_CONFIG_CART, JSON.stringify(newData));
            return [
                ...newData
            ];
        case DELETE_ALL_PRODUCT_CART:
            // console.log('delete all product cart')
            localStorage.removeItem(KEY_CONFIG_CART)
            return [
                ...state
            ]
        default:
            let data = [];
            if (localStorage.getItem(KEY_CONFIG_CART) != null) {
                data = JSON.parse(localStorage.getItem(KEY_CONFIG_CART))
            }
            return [
                ...data
            ]
    }
};

export default filterReducer
