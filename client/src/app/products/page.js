"use strict";
"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@/state/api");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const Header_1 = __importDefault(require("@/app/(components)/Header"));
const Rating_1 = __importDefault(require("@/app/(components)/Rating"));
const CreateProductModal_1 = __importDefault(require("./CreateProductModal"));
const image_1 = __importDefault(require("next/image"));
const Products = () => {
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const { data: products, isLoading, isError, } = (0, api_1.useGetProductsQuery)(searchTerm);
    const [createProduct] = (0, api_1.useCreateProductMutation)();
    const handleCreateProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
        yield createProduct(productData);
    });
    if (isLoading) {
        return <div className="py-4">Loading...</div>;
    }
    if (isError || !products) {
        return (<div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>);
    }
    return (<div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <lucide_react_1.SearchIcon className="w-5 h-5 text-gray-500 m-2"/>
          <input className="w-full py-2 px-4 rounded bg-white" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header_1.default name="Products"/>
        <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded" onClick={() => setIsModalOpen(true)}>
          <lucide_react_1.PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200"/> Create
          Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (<div>Loading...</div>) : (products === null || products === void 0 ? void 0 : products.map((product) => (<div key={product.productId} className="border shadow rounded-md p-4 max-w-full w-full mx-auto">
              <div className="flex flex-col items-center">
                <image_1.default src={`https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/product${Math.floor(Math.random() * 3) + 1}.png`} alt={product.name} width={150} height={150} className="mb-3 rounded-2xl w-36 h-36"/>
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800">${product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (<div className="flex items-center mt-2">
                    <Rating_1.default rating={product.rating}/>
                  </div>)}
              </div>
            </div>)))}
      </div>

      {/* MODAL */}
      <CreateProductModal_1.default isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateProduct}/>
    </div>);
};
exports.default = Products;
