import {useEffect, useRef, useReducer, } from "react";
import { reducer, initialState } from './reducer/formReducer'
import {
    setFieldValue,
    setError,
    setCurrentOnChangeField,
    setSubmitDisable,
    setAllFields,
    setSuccess,
    setOnValidAll
} from './reducer/actions';


function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export const useForm = (options = null, ref1, ref2, ref10) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { errors, onValidAll, onChangeCurrentField, allFields, isSubmitFormDisabled, success, fieldValues } = state;
    const formRef = useRef();

    useEffect(() => {
        setSubmitDisable(dispatch);
        const errors2 = Object.keys(errors).map((field) => {
            const { [field]: test, ...rest } = success
            console.log("TEST: ", test);
            console.log("REST: ", rest);

        });
    }, [errors]);

    useEffect(() => {
        if (options) {
            setAllFields(dispatch, Object.keys(options.validations) );
        }
    }, []);

    useEffect(() => {
        if (onValidAll) {
            const validResults = validateAllFields(options, fieldValues);
            setError(dispatch, validResults);
        }
    }, [onValidAll]);

    useEffect(() => {
        if(onChangeCurrentField) {
            const onChangeField = validate({key: onChangeCurrentField, fieldValues, options});
            setError(dispatch, { ...errors, ...onChangeField });
        }
        if (errors[onChangeCurrentField]) {
            clearError(onChangeCurrentField);
        }
        setCurrentOnChangeField(dispatch, null)
    }, [onChangeCurrentField]);

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
        setError(dispatch, {...clearedErrors});
        setSuccess(dispatch, { [fieldId]: true } ); // fix me on success
    }

    function handleInputChange(e) {
        setFieldValue(dispatch, { [e.target.id]: e.target.value });
        if (errors[e.target.id]) {
            clearError(e.target.id);
        }
    }

    function handleInputBlur(e) {
        const validationResult = validate({ key: e.target.id, fieldValues, options });
        if (isEmpty(validationResult)) {
            setSuccess(dispatch, { [e.target.id]: true } );
        }
        setError(dispatch, { ...errors, ...validationResult });
    }

    function handleCheckboxChange(e) {
        setFieldValue(dispatch, { ...fieldValues, [e.target.id]: e.target.checked })
        setCurrentOnChangeField(dispatch, e.target.id);
    }

    function handleSelectChange(e) {
        setFieldValue(dispatch, { ...fieldValues, [e.target.id]: e.target.value })
        setCurrentOnChangeField(dispatch, e.target.id);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = checkAllFields();
        if (!isSubmitFormDisabled && data) {
            console.log('sending data');
            return;
        }
        setOnValidAll(dispatch);

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