"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const uuid_1 = require("uuid");
const Header_1 = __importDefault(require("@/app/(components)/Header"));
const CreateProductModal = ({ isOpen, onClose, onCreate, }) => {
    const [formData, setFormData] = (0, react_1.useState)({
        productId: (0, uuid_1.v4)(),
        name: "",
        price: 0,
        stockQuantity: 0,
        rating: 0,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: name === "price" || name === "stockQuantity" || name === "rating"
                ? parseFloat(value)
                : value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    };
    if (!isOpen)
        return null;
    const labelCssStyles = "block text-sm font-medium text-gray-700";
    const inputCssStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";
    return (<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header_1.default name="Create New Product"/>
        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelCssStyles}>
            Product Name
          </label>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} className={inputCssStyles} required/>

          {/* PRICE */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Price
          </label>
          <input type="number" name="price" placeholder="Price" onChange={handleChange} value={formData.price} className={inputCssStyles} required/>

          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input type="number" name="stockQuantity" placeholder="Stock Quantity" onChange={handleChange} value={formData.stockQuantity} className={inputCssStyles} required/>

          {/* RATING */}
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input type="number" name="rating" placeholder="Rating" onChange={handleChange} value={formData.rating} className={inputCssStyles} required/>

          {/* CREATE ACTIONS */}
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Create
          </button>
          <button onClick={onClose} type="button" className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
            Cancel
          </button>
        </form>
      </div>
    </div>);
};
exports.default = CreateProductModal;
