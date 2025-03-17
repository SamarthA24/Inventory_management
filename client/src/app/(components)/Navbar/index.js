"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("@/app/redux");
const state_1 = require("@/state");
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const react_1 = __importDefault(require("react"));
const Navbar = () => {
    const dispatch = (0, redux_1.useAppDispatch)();
    const isSidebarCollapsed = (0, redux_1.useAppSelector)((state) => state.global.isSidebarCollapsed);
    const isDarkMode = (0, redux_1.useAppSelector)((state) => state.global.isDarkMode);
    const toggleSidebar = () => {
        dispatch((0, state_1.setIsSidebarCollapsed)(!isSidebarCollapsed));
    };
    const toggleDarkMode = () => {
        dispatch((0, state_1.setIsDarkMode)(!isDarkMode));
    };
    return (<div className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100" onClick={toggleSidebar}>
          <lucide_react_1.Menu className="w-4 h-4"/>
        </button>

        <div className="relative">
          <input type="search" placeholder="Start type to search groups & products" className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"/>

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
            <lucide_react_1.Bell className="text-gray-500" size={20}/>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (<lucide_react_1.Sun className="cursor-pointer text-gray-500" size={24}/>) : (<lucide_react_1.Moon className="cursor-pointer text-gray-500" size={24}/>)}
            </button>
          </div>
          <div className="relative">
            <lucide_react_1.Bell className="cursor-pointer text-gray-500" size={24}/>
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3"/>
          <div className="flex items-center gap-3 cursor-pointer">
            <image_1.default src="https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/profile.jpg" alt="Profile" width={50} height={50} className="rounded-full h-full object-cover"/>
            <span className="font-semibold">Ed Roh</span>
          </div>
        </div>
        <link_1.default href="/settings">
          <lucide_react_1.Settings className="cursor-pointer text-gray-500" size={24}/>
        </link_1.default>
      </div>
    </div>);
};
exports.default = Navbar;
