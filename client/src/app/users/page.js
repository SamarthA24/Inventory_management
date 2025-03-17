"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@/state/api");
const Header_1 = __importDefault(require("@/app/(components)/Header"));
const x_data_grid_1 = require("@mui/x-data-grid");
const columns = [
    { field: "userId", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
];
const Users = () => {
    const { data: users, isError, isLoading } = (0, api_1.useGetUsersQuery)();
    if (isLoading) {
        return <div className="py-4">Loading...</div>;
    }
    if (isError || !users) {
        return (<div className="text-center text-red-500 py-4">Failed to fetch users</div>);
    }
    return (<div className="flex flex-col">
      <Header_1.default name="Users"/>
      <x_data_grid_1.DataGrid rows={users} columns={columns} getRowId={(row) => row.userId} checkboxSelection className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"/>
    </div>);
};
exports.default = Users;
