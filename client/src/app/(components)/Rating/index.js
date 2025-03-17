"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lucide_react_1 = require("lucide-react");
const react_1 = __importDefault(require("react"));
const Rating = ({ rating }) => {
    return [1, 2, 3, 4, 5].map((index) => (<lucide_react_1.Star key={index} color={index <= rating ? "#FFC107" : "#E4E5E9"} className="w-4 h-4"/>));
};
exports.default = Rating;
