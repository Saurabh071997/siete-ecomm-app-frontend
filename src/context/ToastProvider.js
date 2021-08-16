import { createContext, useContext, useReducer } from "react";

export const ToastContext = createContext()

export const toastReducer = (state, action) => {
    switch(action.TYPE){
        case "TOGGLE_TOAST":
            return {
              ...state,
              toastActive: action.payload.toggle,
              toastMessage: action.payload.message
            };
        
        default:
            return state
    }
}

export const ToastProvider = ({children}) => {

    const [toastState , toastDispatch] = useReducer(toastReducer, {
        toastActive:false, 
        toastMessage:""
    })

    return <ToastContext.Provider value={{toastState, toastDispatch}}>
            {children}
        </ToastContext.Provider>
}

export const useToast = () => {
    return useContext(ToastContext)
}