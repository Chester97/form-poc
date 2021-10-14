const validationSetOfrules = {
    minLength: {
        validate: (value) => (value.length >= 6 ? true : false),
        message: "I has to to be at least 6 digits long"
    },
    maxLength: {
        validate: (value) => (value.length >= 20 ? false : true),
        message: "It can be max 20 digits long"
    },
    required: {
        name: "required",
        validate: (value) => (value ? true : false),
        message: "This field is required"
    },
    minAge: {
        validate: (value) => (value >= 18 ? true : false),
        message: "You have to be at least 18 years old."
    }
    // mustBeNumberAge: {
    //   validate: (value) => (value >= 18 ? true : false),
    //   message: "You have to be at least 18 years old."
    // }
};

export const validationRules = {
    validations: {
        name: [
            validationSetOfrules.required,
            validationSetOfrules.minLength,
            validationSetOfrules.maxLength
        ],
        age: [
            validationSetOfrules.required,
            validationSetOfrules.minAge
            // validationSetOfrules.mustBeNumberAge
        ],
        password: [validationSetOfrules.required, validationSetOfrules.minLength],
        gender: [validationSetOfrules.required],
        termsAndConditions: [validationSetOfrules.required]
    },
    onSubmit: () => alert("User submitted!")
};

