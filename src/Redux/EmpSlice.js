import {createSlice} from "@reduxjs/toolkit";

export const EmpSlice = createSlice({

    name: "employee",
    initialState: {
        employee: null,
    },
    reducers: {
        setEmployee: (state , action) => {
            state.employee = action.payload;
        },
        
    },
});

export const { setEmployee } = EmpSlice.actions;