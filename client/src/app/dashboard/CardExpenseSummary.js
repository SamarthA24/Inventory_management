"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@/state/api");
const lucide_react_1 = require("lucide-react");
const recharts_1 = require("recharts");
const colors = ["#00C49F", "#0088FE", "#FFBB28"];
const CardExpenseSummary = () => {
    const { data: dashboardMetrics, isLoading } = (0, api_1.useGetDashboardMetricsQuery)();
    const expenseSummary = dashboardMetrics === null || dashboardMetrics === void 0 ? void 0 : dashboardMetrics.expenseSummary[0];
    const expenseByCategorySummary = (dashboardMetrics === null || dashboardMetrics === void 0 ? void 0 : dashboardMetrics.expenseByCategorySummary) || [];
    const expenseSums = expenseByCategorySummary.reduce((acc, item) => {
        const category = item.category + " Expenses";
        const amount = parseInt(item.amount, 10);
        if (!acc[category])
            acc[category] = 0;
        acc[category] += amount;
        return acc;
    }, {});
    const expenseCategories = Object.entries(expenseSums).map(([name, value]) => ({
        name,
        value,
    }));
    const totalExpenses = expenseCategories.reduce((acc, category) => acc + category.value, 0);
    const formattedTotalExpenses = totalExpenses.toFixed(2);
    return (<div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (<div className="m-5">Loading...</div>) : (<>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Expense Summary
            </h2>
            <hr />
          </div>
          {/* BODY */}
          <div className="xl:flex justify-between pr-7">
            {/* CHART */}
            <div className="relative basis-3/5">
              <recharts_1.ResponsiveContainer width="100%" height={140}>
                <recharts_1.PieChart>
                  <recharts_1.Pie data={expenseCategories} innerRadius={50} outerRadius={60} fill="#8884d8" dataKey="value" nameKey="name" cx="50%" cy="50%">
                    {expenseCategories.map((entry, index) => (<recharts_1.Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>))}
                  </recharts_1.Pie>
                </recharts_1.PieChart>
              </recharts_1.ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                <span className="font-bold text-xl">
                  ${formattedTotalExpenses}
                </span>
              </div>
            </div>
            {/* LABELS */}
            <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
              {expenseCategories.map((entry, index) => (<li key={`legend-${index}`} className="flex items-center text-xs">
                  <span className="mr-2 w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}></span>
                  {entry.name}
                </li>))}
            </ul>
          </div>
          {/* FOOTER */}
          <div>
            <hr />
            {expenseSummary && (<div className="mt-3 flex justify-between items-center px-7 mb-4">
                <div className="pt-2">
                  <p className="text-sm">
                    Average:{" "}
                    <span className="font-semibold">
                      ${expenseSummary.totalExpenses.toFixed(2)}
                    </span>
                  </p>
                </div>
                <span className="flex items-center mt-2">
                  <lucide_react_1.TrendingUp className="mr-2 text-green-500"/>
                  30%
                </span>
              </div>)}
          </div>
        </>)}
    </div>);
};
exports.default = CardExpenseSummary;
