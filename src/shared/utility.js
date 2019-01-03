export const updateObject = (oldObj, updatedProperties) => {
    return {
        ...oldObj,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    // alternative way to handle undefined error for the drop down menu
    // if (!rules) return isValid;
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;
};

export const generateErrorMsg = (value, rules) => {
    let errorMsg = '';
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (rules.required && value.trim() === '') {
        errorMsg = 'All fields are required!';
        return errorMsg;
    }
    if (rules.minLength && value.length < rules.minLength) {
        errorMsg = `Minimum ${rules.minLength} characters`;
        return errorMsg;
    }
    if (rules.maxLength && value.length > rules.maxLength) {
        errorMsg = `Input should not be longer than ${rules.maxLength} characters`;
        return errorMsg;
    }
    if (rules.isEmail && !pattern.test(value)) {
        errorMsg = `Invalid email address`;
        return errorMsg;
    }
};