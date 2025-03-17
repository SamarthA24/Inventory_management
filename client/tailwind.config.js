"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tw_colors_1 = require("tw-colors");
const colors_1 = __importDefault(require("tailwindcss/colors"));
const baseColors = [
    "gray",
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
];
const shadeMapping = {
    "50": "900",
    "100": "800",
    "200": "700",
    "300": "600",
    "400": "500",
    "500": "400",
    "600": "300",
    "700": "200",
    "800": "100",
    "900": "50",
};
const generateThemeObject = (colors, mapping, invert = false) => {
    const theme = {};
    baseColors.forEach((color) => {
        theme[color] = {};
        Object.entries(mapping).forEach(([key, value]) => {
            const shadeKey = invert ? value : key;
            theme[color][key] = colors[color][shadeKey];
        });
    });
    return theme;
};
const lightTheme = generateThemeObject(colors_1.default, shadeMapping);
const darkTheme = generateThemeObject(colors_1.default, shadeMapping, true);
const themes = {
    light: Object.assign(Object.assign({}, lightTheme), { white: "#ffffff" }),
    dark: Object.assign(Object.assign({}, darkTheme), { white: colors_1.default.gray["950"], black: colors_1.default.gray["50"] }),
};
const config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [(0, tw_colors_1.createThemes)(themes)],
};
exports.default = config;
