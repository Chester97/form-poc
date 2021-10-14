import * as React from 'react';
import {useForm} from "./Form/useForm";
import { validationRules } from "./Form/FormValidationRules";

const FormContext = React.createContext();

function FormProvider({children}) {
    const formData = useForm(validationRules);

    return <FormContext.Provider value={formData}>{children}</FormContext.Provider>
}

function useFormContext() {
    const context = React.useContext(FormContext);

    if(context === undefined) {
        throw new Error('useCount must be used within a FormProvider');
    }
    return context;
}

export { FormProvider, useFormContext }

