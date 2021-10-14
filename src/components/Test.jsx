import React, {useContext, useEffect} from 'react';
import Form, { FormContext } from "./Form/Form";
import {Input} from "./Input/Input";
import {FormProvider, useFormContext} from "./form-context";
import {useForm} from "./Form/useForm";
import {validationRules} from "./Form/FormValidationRules";
import {Error} from "./Error/Error";
import {Select} from "./Select/Select";
import {Checkbox} from "./Checkbox/Checkbox";

export function Test() {

    return (
        <Form>
            <TestComp />
        </Form>
    )
}

const TestComp = () => {
    const {
        handleSubmit,
        handleInputChange,
        handleInputBlur,
        handleSelectChange,
        handleCheckboxChange,
        errors,
        fieldValues,
        formRef,
        disableSubmitForm,
        success
    } = useFormContext();
    console.log(success);
    return (
        <form onSubmit={handleSubmit} className="formContainer" ref={formRef}>
            <h1>Registration</h1>
            <Input
                id="name"
                placeholder="Name"
                value={fieldValues?.name || ''}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={(success && success?.name) ? 'valid' : 'invalid'}
            />
            {errors.name?.errorMessage && <Error message={errors.name?.errorMessage} />}
            <Input
                id="age"
                placeholder="Age"
                type="number"
                value={fieldValues?.age}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={(success && success?.age) ? 'valid' : 'invalid'}
            />
            {!errors.age?.isValid && <Error message={errors.age?.errorMessage} />}
            {/*<Input*/}
            {/*    id="email"*/}
            {/*    placeholder="Email"*/}
            {/*    type="email"*/}
            {/*    value={fieldValues?.email}*/}
            {/*    onChange={handleInputChange}*/}
            {/*    onBlur={handleInputBlur}*/}
            {/*    className={errors.email?.isValid ? 'valid' : 'invalid'}*/}
            {/*/>*/}
            <Input
                id="password"
                placeholder="Password"
                type="password"
                value={fieldValues?.password}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={(success && success?.password) ? 'valid' : 'invalid'}
            />
            {!errors.password?.isValid && (
                <Error message={errors.password?.errorMessage} />
            )}
            <Select
                id="gender"
                onChange={handleSelectChange}
                options={["male", "female"]}
                className={(success && success?.gender) ? 'valid' : 'invalid'}
            />
            {!errors.gender?.isValid && (
                <Error message={errors.gender?.errorMessage} />
            )}
            <Checkbox
                id="termsAndConditions"
                onChange={handleCheckboxChange}
                label={"I have read all Terms & Conditions"}
            />
            {!errors.termsAndConditions?.isValid && (
                <Error message={errors.termsAndConditions?.errorMessage} />
            )}
            <button type="submit" className="submit" disabled={disableSubmitForm}>
                Submit
            </button>
        </form>
    );
};