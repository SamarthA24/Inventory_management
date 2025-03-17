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
const navigation_1 = require("next/navigation");
const react_1 = __importDefault(require("react"));
const SidebarLink = ({ href, icon: Icon, label, isCollapsed, }) => {
    const pathname = (0, navigation_1.usePathname)();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");
    return (<link_1.default href={href}>
      <div className={`cursor-pointer flex items-center ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"}
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive ? "bg-blue-200 text-white" : ""}
      }`}>
        <Icon className="w-6 h-6 !text-gray-700"/>

        <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>
          {label}
        </span>
      </div>
    </link_1.default>);
};
const Sidebar = () => {
    const dispatch = (0, redux_1.useAppDispatch)();
    const isSidebarCollapsed = (0, redux_1.useAppSelector)((state) => state.global.isSidebarCollapsed);
    const toggleSidebar = () => {
        dispatch((0, state_1.setIsSidebarCollapsed)(!isSidebarCollapsed));
    };
    const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
    return (<div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-8"}`}>
        <image_1.default src="https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/logo.png" alt="edstock-logo" width={27} height={27} className="rounded w-8"/>
        <h1 className={`${isSidebarCollapsed ? "hidden" : "block"} font-extrabold text-2xl`}>
          EDSTOCK
        </h1>

        <button className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100" onClick={toggleSidebar}>
          <lucide_react_1.Menu className="w-4 h-4"/>
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink href="/dashboard" icon={lucide_react_1.Layout} label="Dashboard" isCollapsed={isSidebarCollapsed}/>
        <SidebarLink href="/inventory" icon={lucide_react_1.Archive} label="Inventory" isCollapsed={isSidebarCollapsed}/>
        <SidebarLink href="/products" icon={lucide_react_1.Clipboard} label="Products" isCollapsed={isSidebarCollapsed}/>
        <SidebarLink href="/users" icon={lucide_react_1.User} label="Users" isCollapsed={isSidebarCollapsed}/>
        <SidebarLink href="/settings" icon={lucide_react_1.SlidersHorizontal} label="Settings" isCollapsed={isSidebarCollapsed}/>
        <SidebarLink href="/expenses" icon={lucide_react_1.CircleDollarSign} label="Expenses" isCollapsed={isSidebarCollapsed}/>
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">&copy; 2024 Edstock</p>
      </div>
    </div>);
};
exports.default = Sidebar;
