import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./reducer"
/**
 * Create store with reducer
 */
export default configureStore({
    reducer: {
        employees : employeeReducer
    }
})