import {useState, useEffect, useRef, } from "react";

const fieldStatusSetter = (isValid, errorMessage) => ({
    isValid,
    errorMessage
});

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export const useForm = (options = null) => {
    const [fieldValues, setFieldValues] = useState({});
    const [errors, setErrors] = useState({});
    const [onChangeField, setonChangeField] = useState(null);
    const [onValidAll, setOnValidAll] = useState(false);
    const [allFields, setAllFields] = useState(null);
    const [disableSubmitForm, setDisableSubmitForm] = useState(false);
    const [success, setSuccess] = useState({});
    const formRef = useRef();

    useEffect(() => {
        if (!isEmpty(errors)) {
            const data = checkAllFields();
            if (data) {
                setOnValidAll(true);
                setDisableSubmitForm(false);
            } else {
                setDisableSubmitForm(true);
            }
        } else {
            setDisableSubmitForm(false);
        }
    }, [errors]);

    useEffect(() => {
        if (options) {
            setAllFields(Object.keys(options.validations));
        }
    }, []);

    useEffect(() => {
        if (onValidAll) {
            let validTest = {};
            const validationRules = options.validations;
            for (const key in validationRules) {
                const res = validate({ key, fieldValues, options });
                if (!isEmpty(res)) {
                    validTest[key] = validate({ key, fieldValues, options });
                }
            }
            setErrors(validTest);
        }
    }, [onValidAll]);

    useEffect(() => {
        if (onChangeField) {
            const validationResult = validate({ key: onChangeField, fieldValues, options });
            if (!isEmpty(validationResult)) {
                setSuccessByValue(onChangeField, false);
            } else {
                setSuccessByValue(onChangeField, true);
            }
            if (errors[onChangeField]) {
                clearError(onChangeField);
            }
            setonChangeField(null);
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
        setErrors({ ...clearedErrors });
        setSuccessByValue(fieldId, true);
    }

    function setDataByValue(id, value) {
        setFieldValues({
            ...fieldValues,
            [id]: value
        });
    }

    function setSuccessByValue(id, value) {
        setSuccess({
            ...success,
            [id]: value
        });
    }

    function handleInputChange(e) {
        if(!disableSubmitForm) {
            setDisableSubmitForm(true);
        }
        setDataByValue(e.target.id, e.target.value);
        if (errors[e.target.id]) {
            clearError(e.target.id);
        }
    }

    function handleInputBlur(e) {
        const validationResult = validate({ key: e.target.id, fieldValues, options });
        const errorField = !isEmpty(validationResult) ? { [e.target.id]: validationResult } : {};
        if (isEmpty(validationResult)) {
            setSuccessByValue(e.target.id, true);
        }
        setErrors((prevState) => {
            return { ...prevState, ...errorField };
        });
    }

    function handleCheckboxChange(e) {
        setDataByValue(e.target.id, e.target.checked);
        setonChangeField(e.target.id);
    }

    function handleSelectChange(e) {
        setDataByValue(e.target.id, e.target.value);
        setonChangeField(e.target.id);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = checkAllFields();
        if (!disableSubmitForm && data) {
            console.log('sending data');
            return;
        }
        setOnValidAll(true);
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
        disableSubmitForm,
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
            validationResult = fieldStatusSetter(false, isRequired.message);
            validationResult = { errorMessage: isRequired.message };
        }
    } else {
        const validErr = rulesToValidate.find((item) => !item.validate(currentFieldState[key]));
        if (validErr) {
            // const errorMessage = fieldStatusSetter(false, validErr.message);
            const errorMessage = validationResult = { errorMessage: validErr.message };
            validationResult = { ...errorMessage };
            return validationResult;
        }
    }
    console.log(validationResult);
    return validationResult ? validationResult : {};
};