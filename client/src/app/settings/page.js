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
const Header_1 = __importDefault(require("@/app/(components)/Header"));
const mockSettings = [
    { label: "Username", value: "john_doe", type: "text" },
    { label: "Email", value: "john.doe@example.com", type: "text" },
    { label: "Notification", value: true, type: "toggle" },
    { label: "Dark Mode", value: false, type: "toggle" },
    { label: "Language", value: "English", type: "text" },
];
const Settings = () => {
    const [userSettings, setUserSettings] = (0, react_1.useState)(mockSettings);
    const handleToggleChange = (index) => {
        const settingsCopy = [...userSettings];
        settingsCopy[index].value = !settingsCopy[index].value;
        setUserSettings(settingsCopy);
    };
    return (<div className="w-full">
      <Header_1.default name="User Settings"/>
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Setting
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (<tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4">{setting.label}</td>
                <td className="py-2 px-4">
                  {setting.type === "toggle" ? (<label className="inline-flex relative items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={setting.value} onChange={() => handleToggleChange(index)}/>
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"></div>
                    </label>) : (<input type="text" className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500" value={setting.value} onChange={(e) => {
                    const settingsCopy = [...userSettings];
                    settingsCopy[index].value = e.target.value;
                    setUserSettings(settingsCopy);
                }}/>)}
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
};
exports.default = Settings;
