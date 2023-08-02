import { createSlice } from "@reduxjs/toolkit";

const initialState = []

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