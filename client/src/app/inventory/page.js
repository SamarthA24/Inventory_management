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
    { field: "productId", headerName: "ID", width: 90 },
    { field: "name", headerName: "Product Name", width: 200 },
    {
        field: "price",
        headerName: "Price",
        width: 110,
        type: "number",
        valueGetter: (value, row) => `$${row.price}`,
    },
    {
        field: "rating",
        headerName: "Rating",
        width: 110,
        type: "number",
        valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
    },
    {
        field: "stockQuantity",
        headerName: "Stock Quantity",
        width: 150,
        type: "number",
    },
];
const Inventory = () => {
    const { data: products, isError, isLoading } = (0, api_1.useGetProductsQuery)();
    if (isLoading) {
        return <div className="py-4">Loading...</div>;
    }
    if (isError || !products) {
        return (<div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>);
    }
    return (<div className="flex flex-col">
      <Header_1.default name="Inventory"/>
      <x_data_grid_1.DataGrid rows={products} columns={columns} getRowId={(row) => row.productId} checkboxSelection className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"/>
    </div>);
};
exports.default = Inventory;
