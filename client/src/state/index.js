"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIsDarkMode = exports.setIsSidebarCollapsed = exports.globalSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    isSidebarCollapsed: false,
    isDarkMode: false,
};
exports.globalSlice = (0, toolkit_1.createSlice)({
    name: "global",
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state, action) => {
            state.isSidebarCollapsed = action.payload;
        },
        setIsDarkMode: (state, action) => {
            state.isDarkMode = action.payload;
        },
    },
});
_a = exports.globalSlice.actions, exports.setIsSidebarCollapsed = _a.setIsSidebarCollapsed, exports.setIsDarkMode = _a.setIsDarkMode;
exports.default = exports.globalSlice.reducer;
