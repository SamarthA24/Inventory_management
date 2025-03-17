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
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@/state/api");
const lucide_react_1 = require("lucide-react");
const react_1 = __importStar(require("react"));
const recharts_1 = require("recharts");
const CardSalesSummary = () => {
    const { data, isLoading, isError } = (0, api_1.useGetDashboardMetricsQuery)();
    const salesData = (data === null || data === void 0 ? void 0 : data.salesSummary) || [];
    const [timeframe, setTimeframe] = (0, react_1.useState)("weekly");
    const totalValueSum = salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0;
    const averageChangePercentage = salesData.reduce((acc, curr, _, array) => {
        return acc + curr.changePercentage / array.length;
    }, 0) || 0;
    const highestValueData = salesData.reduce((acc, curr) => {
        return acc.totalValue > curr.totalValue ? acc : curr;
    }, salesData[0] || {});
    const highestValueDate = highestValueData.date
        ? new Date(highestValueData.date).toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "2-digit",
        })
        : "N/A";
    if (isError) {
        return <div className="m-5">Failed to fetch data</div>;
    }
    return (<div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (<div className="m-5">Loading...</div>) : (<>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Sales Summary
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div>
            {/* BODY HEADER */}
            <div className="flex justify-between items-center mb-6 px-7 mt-5">
              <div className="text-lg font-medium">
                <p className="text-xs text-gray-400">Value</p>
                <span className="text-2xl font-extrabold">
                  $
                  {(totalValueSum / 1000000).toLocaleString("en", {
                maximumFractionDigits: 2,
            })}
                  m
                </span>
                <span className="text-green-500 text-sm ml-2">
                  <lucide_react_1.TrendingUp className="inline w-4 h-4 mr-1"/>
                  {averageChangePercentage.toFixed(2)}%
                </span>
              </div>
              <select className="shadow-sm border border-gray-300 bg-white p-2 rounded" value={timeframe} onChange={(e) => {
                setTimeframe(e.target.value);
            }}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            {/* CHART */}
            <recharts_1.ResponsiveContainer width="100%" height={350} className="px-7">
              <recharts_1.BarChart data={salesData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <recharts_1.CartesianGrid strokeDasharray="" vertical={false}/>
                <recharts_1.XAxis dataKey="date" tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
            }}/>
                <recharts_1.YAxis tickFormatter={(value) => {
                return `$${(value / 1000000).toFixed(0)}m`;
            }} tick={{ fontSize: 12, dx: -1 }} tickLine={false} axisLine={false}/>
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
                <recharts_1.Bar dataKey="totalValue" fill="#3182ce" barSize={10} radius={[10, 10, 0, 0]}/>
              </recharts_1.BarChart>
            </recharts_1.ResponsiveContainer>
          </div>

          {/* FOOTER */}
          <div>
            <hr />
            <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
              <p>{salesData.length || 0} days</p>
              <p className="text-sm">
                Highest Sales Date:{" "}
                <span className="font-bold">{highestValueDate}</span>
              </p>
            </div>
          </div>
        </>)}
    </div>);
};
exports.default = CardSalesSummary;
