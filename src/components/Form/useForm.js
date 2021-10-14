import {useState, useEffect, useRef, useReducer, } from "react";
import { reducer, initialState } from './reducer/formReducer'
import { Actions } from './reducer/actions';

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export const useForm = (options = null) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { errors, onValidAll, onChangeField, allFields, isSubmitFormDisabled, success, fieldValues } = state;
    const formRef = useRef();

    useEffect(() => {
        dispatch({ type: Actions.DISABLE_SUBMIT_BUTTON });
    }, [errors]);

    useEffect(() => {
        if (options) {
            dispatch({ type: Actions.ALL_FIELDS, payload: Object.keys(options.validations) })
        }
    }, []);

    useEffect(() => {
        if (onValidAll) {
            const validResults = validateAllFields(options, fieldValues);
            dispatch({ type: Actions.ERRORS, payload: validResults });
        }
    }, [onValidAll]);

    useEffect(() => {
        if (onChangeField && errors[onChangeField]) {
            clearError(onChangeField);
            dispatch({ type: Actions.ON_CHANGE_FIELD, payload: null })
        }
    }, [onChangeField, fieldValues]);

    function checkAllFields() {
        if (isEmpty(fieldValues)) return false;
        const areAllFieldsValid = allFields?.every((item) => {
            if (!fieldValues[item]) return false;
            return !errors[item];
        });
        return !!areAllFieldsValid;
    }

    function clearError(fieldId) {
        if (errors[fieldId] && !errors[fieldId].errorMessage) return;
        // eslint-disable-next-line no-unused-vars
        const { [fieldId]: currentElement, ...clearedErrors } = errors;
        dispatch({ type: Actions.ERRORS, payload: { ...clearedErrors } });
        dispatch({ type: Actions.SUCCESS, payload: { [fieldId]: true } }) // fix me on success
    }

    function handleInputChange(e) {
        dispatch({ type: Actions.FIELD_VALUES, payload: { ...fieldValues, [e.target.id]: e.target.value } })
        if (errors[e.target.id]) {
            clearError(e.target.id);
        }
    }

    function handleInputBlur(e) {
        const validationResult = validate({ key: e.target.id, fieldValues, options });
        if (isEmpty(validationResult)) {
            dispatch({ type: Actions.SUCCESS, payload: { [e.target.id]: true } })
        }
        dispatch({ type: Actions.ERRORS, payload: { ...errors, ...validationResult } });
    }

    function handleCheckboxChange(e) {
        dispatch({ type: Actions.FIELD_VALUES, payload: { ...fieldValues, [e.target.id]: e.target.checked } })
        dispatch({ type: Actions.ON_CHANGE_FIELD, payload: e.target.id })
    }

    function handleSelectChange(e) {
        dispatch({ type: Actions.FIELD_VALUES, payload: { ...fieldValues, [e.target.id]: e.target.value } })
        dispatch({ type: Actions.ON_CHANGE_FIELD, payload: e.target.id })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = checkAllFields();
        if (!isSubmitFormDisabled && data) {
            console.log('sending data');
            return;
        }
        dispatch({ type: Actions.ON_VALID_ALL })
    };

    return {
        handleInputBlur,
        handleInputChange,
        handleCheckboxChange,
        handleSelectChange,
        handleSubmit,
        fieldValues,
        errors,
        onValidAll,
        formRef,
        isSubmitFormDisabled,
        success
    };
};

export const validate = ({ key, fieldValues, options }) => {
    const currentFieldState = { ...fieldValues };
    let validationResult = {};
    const rulesToValidate = options.validations[key];
    if (!currentFieldState[key]) {
        const isRequired = rulesToValidate.find((el) => el.name === 'required');
        if (isRequired) {
            validationResult = { [key]: { errorMessage: isRequired.message } };
        }
    } else {
        const validErr = rulesToValidate.find((item) => !item.validate(currentFieldState[key]));
        if (validErr) {
            validationResult = { [key]: { errorMessage: validErr.message } };
            // return validationResult;
        }
    }
    return validationResult[key] ? validationResult : {};
};

export function validateAllFields(options, fieldValues) {
    const values = { ...fieldValues };
    let validResults = {};
    const validationRules = options.validations;
    for (const key in validationRules) {
        const res = validate({ key, fieldValues: values, options });
        if (!isEmpty(res)) {
            validResults = { ...validResults, ...res };
        }
    }

    return validResults;
}