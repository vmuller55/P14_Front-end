import { createSlice } from "@reduxjs/toolkit";

const initialState = []
/**
 * Create employee slice to manage action and selector
 */
const employeeSlice = createSlice({
    name : 'employee',
    initialState,
    reducers : {
        addEmployee: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const selectAllEmployees = (state) => state.employees;

export const {addEmployee} = employeeSlice.actions
export default employeeSlice.reducer