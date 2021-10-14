import { Actions } from './actions';

export const initialState = {
    isSubmitFormDisabled: false,
    onValidAll: false,
    errors: {},
    success: {},
    allFields: null,
    onChangeField: null,
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
    }else if(action.type === Actions.ON_CHANGE_FIELD) {
        // console.log("ALL_FIELDS: ", action.payload);
        return {
            ...state,
            onChangeField: action.payload,
        }
    }else if(action.type === Actions.FIELD_VALUES) {
        // console.log("FIELD_VALUES: ", action.payload);
        return {
            ...state,
            fieldValues: action.payload
        }
    } else {
        throw new Error("THERE IS NO STATE TO UPDATE")
    }
}





// import { Actions } from './consts';
//
// export function reducer(state, action) {
//     const actionMap = {
//         SET_SEARCH_ACTIVE: () => ({
//             ...state,
//             searchActive: action.searchActive,
//             mobileMenuActive: false,
//             signInMenuActive: false
//         }),
//         SET_MOBILE_MENU_ACTIVE: () => ({
//             ...state,
//             mobileMenuActive: action.mobileMenuActive,
//             signInMenuActive: false,
//             searchActive: false
//         }),
//         SET_SIGN_IN_MENU_ACTIVE: () => ({
//             ...state,
//             signInMenuActive: action.signInMenuActive,
//             mobileMenuActive: false,
//             searchActive: false
//         }),
//         CLOSE_ALL_POPUPS: () => ({
//             ...state,
//             signInMenuActive: false,
//             mobileMenuActive: false,
//             searchActive: false
//         }),
//         SET_AT_TOP: () => ({
//             ...state,
//             atTop: action.atTop
//         }),
//         SET_FIXED: () => ({
//             ...state,
//             fixed: action.fixed
//         })
//     };
//
//     return action.type in actionMap && actionMap[action.type]();
// }
//
// export function setSearchActive(dispatch, searchActive) {
//     dispatch({ type: Actions.SET_SEARCH_ACTIVE, searchActive });
// }
//
// export function setMobileMenuActive(dispatch, mobileMenuActive) {
//     dispatch({ type: Actions.SET_MOBILE_MENU_ACTIVE, mobileMenuActive });
// }
//
// export function setSignInMenuActive(dispatch, signInMenuActive) {
//     dispatch({ type: Actions.SET_SIGN_IN_MENU_ACTIVE, signInMenuActive });
// }
//
// export function closeAllPopups(dispatch) {
//     dispatch({ type: Actions.CLOSE_ALL_POPUPS });
// }
//
// export function setAtTop(dispatch, atTop) {
//     dispatch({ type: Actions.SET_AT_TOP, atTop });
// }
//
// export function setFixed(dispatch, fixed) {
//     dispatch({ type: Actions.SET_FIXED, fixed });
// }
