import { useState } from "react";

const fieldStatusSetter = (isValid, errorMessage) => ({
    isValid,
    errorMessage
});

function checkErrors(obj) {
    const objOfErrors = {...obj};
    const res = Object.values(objOfErrors).find((item) => !item?.isValid);

    return res ? false : true;
}

function sendDataSimulation(error, data) {
    console.log("SENDOING")
    console.log("error: ", error)
    console.log("data: ", data)
}

const withValidation = (Component, options) => {
    return (props) => {
        const [data, setData] = useState({});
        const [errors, setErrors] = useState({});
        const [valid, setValid] = useState(false);
        console.log(errors);
        let newErrors = { ...errors };

        function clearError(fieldId) {
            const { [fieldId]: currentElement, ...clearedErrors } = errors;
            setErrors(clearedErrors);
        }

        function validateOnChange(element) {
            switch (element.target.type) {
                case "checkbox":
                    validateUtil(element.target.checked, element.target.id);
                    break;
                case "select-one":
                    validateUtil(element.target.value, element.target.id);
                    break;
                default:
                    return;
            }
        }

        function validateUtil(value, id) {
            if (value) {
                const checkboxErrorState = validationResultSetter(true, "");
                setErrors({ ...errors, [id]: checkboxErrorState });
            }
        }

        // fix me, i'm ugly
        const handleChange = (e) => {
            setData({
                ...data,
                [e.target.id]:
                    e.target.type === "checkbox" ? e.target.checked : e.target.value
            });

            if (e.target.type === "checkbox" || e.target.type === "select-one") {
                validateOnChange(e);
            }

            if (e.target.type !== "checkbox" && e.target.value.length < 2) {
                clearError(e.target.id);
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
            let validationResult = validationResultSetter(true, "");
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

export default withValidation;
