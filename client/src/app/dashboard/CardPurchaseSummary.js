"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@/state/api");
const lucide_react_1 = require("lucide-react");
const numeral_1 = __importDefault(require("numeral"));
const react_1 = __importDefault(require("react"));
const recharts_1 = require("recharts");
const CardPurchaseSummary = () => {
    const { data, isLoading } = (0, api_1.useGetDashboardMetricsQuery)();
    const purchaseData = (data === null || data === void 0 ? void 0 : data.purchaseSummary) || [];
    const lastDataPoint = purchaseData[purchaseData.length - 1] || null;
    return (<div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
      {isLoading ? (<div className="m-5">Loading...</div>) : (<>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Purchase Summary
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div>
            {/* BODY HEADER */}
            <div className="mb-4 mt-7 px-7">
              <p className="text-xs text-gray-400">Purchased</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {lastDataPoint
                ? (0, numeral_1.default)(lastDataPoint.totalPurchased).format("$0.00a")
                : "0"}
                </p>
                {lastDataPoint && (<p className={`text-sm ${lastDataPoint.changePercentage >= 0
                    ? "text-green-500"
                    : "text-red-500"} flex ml-3`}>
                    {lastDataPoint.changePercentage >= 0 ? (<lucide_react_1.TrendingUp className="w-5 h-5 mr-1"/>) : (<lucide_react_1.TrendingDown className="w-5 h-5 mr-1"/>)}
                    {Math.abs(lastDataPoint.changePercentage)}%
                  </p>)}
              </div>
            </div>
            {/* CHART */}
            <recharts_1.ResponsiveContainer width="100%" height={200} className="p-2">
              <recharts_1.AreaChart data={purchaseData} margin={{ top: 0, right: 0, left: -50, bottom: 45 }}>
                <recharts_1.XAxis dataKey="date" tick={false} axisLine={false}/>
                <recharts_1.YAxis tickLine={false} tick={false} axisLine={false}/>
                <recharts_1.Tooltip formatter={(value) => [
                `$${value.toLocaleString("en")}`,
            ]} labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
            }}/>
                <recharts_1.Area type="linear" dataKey="totalPurchased" stroke="#8884d8" fill="#8884d8" dot={true}/>
              </recharts_1.AreaChart>
            </recharts_1.ResponsiveContainer>
          </div>
        </>)}
    </div>);
};
exports.default = CardPurchaseSummary;
