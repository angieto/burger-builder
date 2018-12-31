import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: orderId,
        orderData: orderData
    };
};

export const purchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        error: error
    };
};

// async

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseStart());
        axios.post('/orders.json', orderData)
             .then(res => {
                 console.log(res.data);
                 dispatch(purchaseSuccess(res.data.name, orderData));
             })
             .catch(err => {
                 dispatch(purchaseFail(err));
             });
    };
};