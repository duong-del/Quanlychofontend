import { createSlice } from "@reduxjs/toolkit";
import { List } from "antd";

const appSlice = createSlice({
    name: "fontend-1",
    initialState: {
        isDarkMode: false,
        title: "home",
        location: {
            pathName: '',
            payload: {},
            prevPathName: ''
        },

    },
    reducers: {
        setTitle : (state,action) =>({
            ...state,
            title: action.payload
        }),
    
    }
})

export const { setTitle } = appSlice.reducer;
export default appSlice.reducer;