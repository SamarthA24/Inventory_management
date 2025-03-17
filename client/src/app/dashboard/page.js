"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lucide_react_1 = require("lucide-react");
const CardExpenseSummary_1 = __importDefault(require("./CardExpenseSummary"));
const CardPopularProducts_1 = __importDefault(require("./CardPopularProducts"));
const CardPurchaseSummary_1 = __importDefault(require("./CardPurchaseSummary"));
const CardSalesSummary_1 = __importDefault(require("./CardSalesSummary"));
const StatCard_1 = __importDefault(require("./StatCard"));
const Dashboard = () => {
    return (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts_1.default />
      <CardSalesSummary_1.default />
      <CardPurchaseSummary_1.default />
      <CardExpenseSummary_1.default />
      <StatCard_1.default title="Customer & Expenses" primaryIcon={<lucide_react_1.Package className="text-blue-600 w-6 h-6"/>} dateRange="22 - 29 October 2023" details={[
            {
                title: "Customer Growth",
                amount: "175.00",
                changePercentage: 131,
                IconComponent: lucide_react_1.TrendingUp,
            },
            {
                title: "Expenses",
                amount: "10.00",
                changePercentage: -56,
                IconComponent: lucide_react_1.TrendingDown,
            },
        ]}/>
      <StatCard_1.default title="Dues & Pending Orders" primaryIcon={<lucide_react_1.CheckCircle className="text-blue-600 w-6 h-6"/>} dateRange="22 - 29 October 2023" details={[
            {
                title: "Dues",
                amount: "250.00",
                changePercentage: 131,
                IconComponent: lucide_react_1.TrendingUp,
            },
            {
                title: "Pending Orders",
                amount: "147",
                changePercentage: -56,
                IconComponent: lucide_react_1.TrendingDown,
            },
        ]}/>
      <StatCard_1.default title="Sales & Discount" primaryIcon={<lucide_react_1.Tag className="text-blue-600 w-6 h-6"/>} dateRange="22 - 29 October 2023" details={[
            {
                title: "Sales",
                amount: "1000.00",
                changePercentage: 20,
                IconComponent: lucide_react_1.TrendingUp,
            },
            {
                title: "Discount",
                amount: "200.00",
                changePercentage: -10,
                IconComponent: lucide_react_1.TrendingDown,
            },
        ]}/>
    </div>);
};
exports.default = Dashboard;
