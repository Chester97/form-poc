import React  from "react";
import {withValidation} from "../WithValidation/WithValidation";
import { validationRules } from "./FormValidationRules";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { Checkbox } from "../Checkbox/Checkbox";
import { Error } from "../Error/Error";
import "./styles.scss";
import { useForm } from './useForm';
import {FormProvider, useFormContext} from "../form-context";

const Form = ({ children }) => {
    return (
        <FormProvider>
            {children}
        </FormProvider>
    );
};

export default Form;



// const Form = () => {
//     const { handleInputChange, handleCheckboxChange, handleSelectChange, fieldValues, errors, handleSubmit, handleInputBlur } = useForm(validationRules);
//     return (
//         <form onSubmit={handleSubmit} className="formContainer">
//             <h1>Registration</h1>
//             <Input
//                 id="name"
//                 placeholder="Name"
//                 value={fieldValues?.name || ''}
//                 onChange={handleInputChange}
//                 onBlur={handleInputBlur}
//             />
//             {!errors.name?.isValid && <Error message={errors.name?.errorMessage} />}
//             <Input
//                 id="age"
//                 placeholder="Age"
//                 type="number"
//                 value={fieldValues?.age}
//                 onChange={handleInputChange}
//                 onBlur={handleInputBlur}
//             />
//             {!errors.age?.isValid && <Error message={errors.age?.errorMessage} />}
//             <Input
//                 id="email"
//                 placeholder="Email"
//                 type="email"
//                 value={fieldValues?.email}
//                 onChange={handleInputChange}
//                 onBlur={handleInputBlur}
//             />
//             <Input
//                 id="password"
//                 placeholder="Password"
//                 type="password"
//                 value={fieldValues?.password}
//                 onChange={handleInputChange}
//                 onBlur={handleInputBlur}
//             />
//             {!errors.password?.isValid && (
//                 <Error message={errors.password?.errorMessage} />
//             )}
//             <Select
//                 id="gender"
//                 onChange={handleSelectChange}
//                 options={["male", "female"]}
//             />
//             {!errors.gender?.isValid && (
//                 <Error message={errors.gender?.errorMessage} />
//             )}
//             <Checkbox
//                 id="termsAndConditions"
//                 onChange={handleCheckboxChange}
//                 label={"I have read all Terms & Conditions"}
//             />
//             {!errors.termsAndConditions?.isValid && (
//                 <Error message={errors.termsAndConditions?.errorMessage} />
//             )}
//             <button type="submit" className="submit">
//                 Submit
//             </button>
//         </form>
//     );
// };
//
// // const FormWithValidation = withValidation(Form, validationRules);
// export default Form;
