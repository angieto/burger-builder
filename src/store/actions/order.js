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
export const purchaseStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
             .then(res => {
                 console.log(res.data);
                 dispatch(purchaseSuccess(res.data, orderData));
             })
             .catch(err => {
                 dispatch(purchaseFail(err));
             });
    };
};