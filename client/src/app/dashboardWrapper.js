"use strict";
"use client";
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
const Navbar_1 = __importDefault(require("@/app/(components)/Navbar"));
const Sidebar_1 = __importDefault(require("@/app/(components)/Sidebar"));
const redux_1 = __importStar(require("./redux"));
const DashboardLayout = ({ children }) => {
    const isSidebarCollapsed = (0, redux_1.useAppSelector)((state) => state.global.isSidebarCollapsed);
    const isDarkMode = (0, redux_1.useAppSelector)((state) => state.global.isDarkMode);
    (0, react_1.useEffect)(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.add("light");
        }
    });
    return (<div className={`${isDarkMode ? "dark" : "light"} flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      <Sidebar_1.default />
      <main className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${isSidebarCollapsed ? "md:pl-24" : "md:pl-72"}`}>
        <Navbar_1.default />
        {children}
      </main>
    </div>);
};
const DashboardWrapper = ({ children }) => {
    return (<redux_1.default>
      <DashboardLayout>{children}</DashboardLayout>
    </redux_1.default>);
};
exports.default = DashboardWrapper;
