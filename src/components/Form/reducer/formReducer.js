import { Actions } from './const';

export const initialState = {
    isSubmitFormDisabled: false,
    onValidAll: false,
    errors: {},
    success: {},
    allFields: null,
    onChangeCurrentField: null,
    fieldValues: {}
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function reducer(state, action) {
    if(action.type === Actions.DISABLE_SUBMIT_BUTTON) {
        const disableSubmitState = isEmpty(state.errors) ? false : true;
        return {
            ...state,
            isSubmitFormDisabled: disableSubmitState,
        }
    }else if(action.type === Actions.ON_VALID_ALL) {
        return {
            ...state,
            onValidAll: true,
        }
    }else if(action.type === Actions.ERRORS) {
        // console.log("ERRORS: ",action.payload)
        return {
            ...state,
            errors: action.payload
        }
    }else if(action.type === Actions.SUCCESS) {
        // console.log("SUCCESS: ",action.payload);
        return {
            ...state,
            success: {...state.success, ...action.payload}
        }
    }else if(action.type === Actions.ALL_FIELDS) {
        // console.log("ALL_FIELDS: ", action.payload);
        return {
            ...state,
            allFields: action.payload
        }
    }else if(action.type === Actions.ON_CHANGE_CURRENT_FIELD) {
        // console.log("ALL_FIELDS: ", action.payload);
        return {
            ...state,
            onChangeCurrentField: action.payload,
        }
    }else if(action.type === Actions.FIELD_VALUES) {
        // console.log("FIELD_VALUES: ", action.payload);
        return {
            ...state,
            fieldValues: {...state.fieldValues, ...action.payload}
        }
    } else {
        throw new Error("THERE IS NO STATE TO UPDATE")
    }
}
