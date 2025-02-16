
import { ADD_PRODUCT_TO_CART,
    UPDATE_AMOUNT_PRODUCT_CART_BY_ID,
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

function getAmountProductCart(array, product) {
    for(let i = 0; i < array.length; i++){
        if(array[i].idBook === product.idBook){
            return array[i].amount;
        }
    }
    return -1;
}

function resetMaxAmountProductCart(array, product) {
    for(let i = 0; i < array.length; i++){
        if(array[i].idBook === product.idBook){
            array[i].amount = 8;
            return true;
        }
    }
    return false;
}

function updateAmountProductCartById(array, amount, id) {
    for(let i = 0; i < array.length; i++){
        if(array[i].idBook === id){
            array[i].amount = amount;
            return true;
        }
    }
    return false;
}

function totalAmountProductCart(array) {
    let total = 0;
    array.map(book => {
        total += book.final_price * book.amount
    })
    return total;
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
                    if (getAmountProductCart(newData, item) > 8) {
                        if (resetMaxAmountProductCart(newData, item)) {
                            let totalAmount = totalAmountProductCart(newData);
                            return {
                                error: true,
                                message: 'Error!!! Limited quantity is 8 in cart',
                                carts:[...newData],
                                totalAmount
                            }
                        } else {
                            let totalAmount = totalAmountProductCart(newData);
                            return {
                                error: true,
                                message: 'Error!!! Please reset the page',
                                carts:[...newData],
                                totalAmount
                            }
                        }
                    }
                    // console.log('check sản phẩm có tồn tại');
                    localStorage.setItem(KEY_CONFIG_CART, JSON.stringify(newData));
                    let totalAmount = totalAmountProductCart(newData);
                    return {
                        error: false,
                        message: 'The product is already in the cart! The quantity has been updated successfully',
                        carts:[...newData],
                        totalAmount
                    }
                }
            }
            // console.log('check cart không sản phẩm');
            newData.push(item);
            localStorage.setItem(KEY_CONFIG_CART, JSON.stringify(newData));
            let totalAmount = totalAmountProductCart(newData);
            return {
                error: false,
                message: 'Success! You have added a product to your cart',
                carts:[...newData],
                totalAmount
            }
        case DELETE_ALL_PRODUCT_CART:
            // console.log('delete all product cart')
            localStorage.removeItem(KEY_CONFIG_CART)
            return {
                error: false,
                message: 'Delete all products successfully',
                carts:[],
                totalAmount: 0
            }
        case DELETE_PRODUCT_CART_BY_ID:
            if (localStorage.getItem(KEY_CONFIG_CART) != null) {
                let newData = JSON.parse(localStorage.getItem(KEY_CONFIG_CART));
                newData = newData.filter(item => item.idBook !== action.id);
                localStorage.setItem(KEY_CONFIG_CART, JSON.stringify(newData));
                let totalAmount = totalAmountProductCart(newData);
                return {
                    error: false,
                    message: 'Delete product successfully',
                    carts: newData,
                    totalAmount
                }
            }
            return {
                error: true,
                message: 'Error!!! Please reset the page',
                carts: [],
                totalAmount: 0
            }
        case UPDATE_AMOUNT_PRODUCT_CART_BY_ID:
            if (localStorage.getItem(KEY_CONFIG_CART) != null) {
                let newData = JSON.parse(localStorage.getItem(KEY_CONFIG_CART));
                if (updateAmountProductCartById(newData, action.amount, action.id)) {
                    localStorage.setItem(KEY_CONFIG_CART, JSON.stringify(newData));
                    let totalAmount = totalAmountProductCart(newData);
                    return {
                        error: false,
                        message: 'Update quantity product successfully',
                        carts: newData,
                        totalAmount
                    }
                }
                else {
                    return {
                        error: true,
                        message: 'Error!!! Please reset the page',
                        carts: [],
                        totalAmount: 0
                    }
                }
            }
            return {
                error: true,
                message: 'Error!!! Please reset the page',
                carts: [],
                totalAmount: 0
            }
        default:
            let data = [];
            let total = 0;
            if (localStorage.getItem(KEY_CONFIG_CART) != null) {
                data = JSON.parse(localStorage.getItem(KEY_CONFIG_CART));
                total = totalAmountProductCart(data);
            }
            return {
                error: '',
                message: '',
                carts:[...data],
                totalAmount: total
            }
    }
};

export default filterReducer
