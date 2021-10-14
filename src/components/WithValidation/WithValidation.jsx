import {useState, useCallback, useEffect} from "react";

export const withValidation = (Component, options) => {
    return (props) => {
        const [data, setData] = useState(options?.initialValues || {});
        const [errors, setErrors] = useState({});
        const [valid, setValid] = useState(false);
        let newErrors = { ...errors };

        function clearError(fieldId) {
            const { [fieldId]: currentElement, ...clearedErrors } = errors;
            setErrors(clearedErrors);
        }

        function validateCheckbox(e) {
            const checkboxId = e.target.id;
            const checkboxState = e.target.checked;
            if (checkboxState) {
                const checkboxErrorState = {
                    isValid: true,
                    errorMessage: ""
                };
                setErrors({ ...errors, [checkboxId]: checkboxErrorState });
            }
        }

        // fix me, i'm ugly
        const handleChange = (e) => {
            e.preventDefault();
            const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
            setData((prevValue) => {
                return {
                    ...prevValue,
                    [e.target.id]: val
                }
            });
            if (e.target.type !== "checkbox" && e.target.value.length < 2) {
                clearError(e.target.id);
            }
            if (e.target.type === "checkbox") {
                validate(e.target.id);
                // validateCheckbox(e);
            }
        };

        const validateAll = (e) => {
            e.preventDefault();
            setValid(true);
            Object.keys(options.validations).forEach((key) => {
                validate(key);
            });
            if (!valid) {
                setErrors(newErrors);
                return;
            }
        };

        const validate = (key) => {
            const ruleSet = options.validations[key];
            let validationResult = { isValid: true, errorMessage: "" };
            if (!data[key]) {
                const isRequired = ruleSet.find((el) => el.name === "required");
                if (isRequired) {
                    validationResult = {
                        isValid: false,
                        errorMessage: isRequired.message
                    };
                }
            } else {
                validationResult = ruleSet.reduce(
                    (result, rule) => {
                        if (!result.isValid) {
                            return result;
                        }
                        const isValid = data[key] ? rule.validate(data[key]) : false;
                        result.isValid = isValid;
                        result.errorMessage = isValid ? "" : rule.message || "";
                        return result;
                    },
                    { ...validationResult }
                );
            }
            setValid(false);
            newErrors[key] = validationResult;
        };

        const handleSubmit = (e) => {
            validateAll(e);
        };

        const handleBlur = (e) => {
            validate(e.target.id);
            if (!valid) {
                setErrors(newErrors);
                return;
            }
        };

        const newProps = {
            data,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            ...props
        };
        return <Component {...newProps} />;
    };
};