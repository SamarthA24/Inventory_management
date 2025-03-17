"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@/state/api");
const react_1 = require("react");
const Header_1 = __importDefault(require("@/app/(components)/Header"));
const recharts_1 = require("recharts");
const Expenses = () => {
    const [activeIndex, setActiveIndex] = (0, react_1.useState)(0);
    const [selectedCategory, setSelectedCategory] = (0, react_1.useState)("All");
    const [startDate, setStartDate] = (0, react_1.useState)("");
    const [endDate, setEndDate] = (0, react_1.useState)("");
    const { data: expensesData, isLoading, isError, } = (0, api_1.useGetExpensesByCategoryQuery)();
    const expenses = (0, react_1.useMemo)(() => expensesData !== null && expensesData !== void 0 ? expensesData : [], [expensesData]);
    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };
    const aggregatedData = (0, react_1.useMemo)(() => {
        const filtered = expenses
            .filter((data) => {
            const matchesCategory = selectedCategory === "All" || data.category === selectedCategory;
            const dataDate = parseDate(data.date);
            const matchesDate = !startDate ||
                !endDate ||
                (dataDate >= startDate && dataDate <= endDate);
            return matchesCategory && matchesDate;
        })
            .reduce((acc, data) => {
            const amount = parseInt(data.amount);
            if (!acc[data.category]) {
                acc[data.category] = { name: data.category, amount: 0 };
                acc[data.category].color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                acc[data.category].amount += amount;
            }
            return acc;
        }, {});
        return Object.values(filtered);
    }, [expenses, selectedCategory, startDate, endDate]);
    const classNames = {
        label: "block text-sm font-medium text-gray-700",
        selectInput: "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
    };
    if (isLoading) {
        return <div className="py-4">Loading...</div>;
    }
    if (isError || !expensesData) {
        return (<div className="text-center text-red-500 py-4">
        Failed to fetch expenses
      </div>);
    }
    return (<div>
      {/* HEADER */}
      <div className="mb-5">
        <Header_1.default name="Expenses"/>
        <p className="text-sm text-gray-500">
          A visual representation of expenses over time.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter by Category and Date
          </h3>
          <div className="space-y-4">
            {/* CATEGORY */}
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select id="category" name="category" className={classNames.selectInput} defaultValue="All" onChange={(e) => setSelectedCategory(e.target.value)}>
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>
            {/* START DATE */}
            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input type="date" id="start-date" name="start-date" className={classNames.selectInput} onChange={(e) => setStartDate(e.target.value)}/>
            </div>
            {/* END DATE */}
            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input type="date" id="end-date" name="end-date" className={classNames.selectInput} onChange={(e) => setEndDate(e.target.value)}/>
            </div>
          </div>
        </div>
        {/* PIE CHART */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <recharts_1.ResponsiveContainer width="100%" height={400}>
            <recharts_1.PieChart>
              <recharts_1.Pie data={aggregatedData} cx="50%" cy="50%" label outerRadius={150} fill="#8884d8" dataKey="amount" onMouseEnter={(_, index) => setActiveIndex(index)}>
                {aggregatedData.map((entry, index) => (<recharts_1.Cell key={`cell-${index}`} fill={index === activeIndex ? "rgb(29, 78, 216)" : entry.color}/>))}
              </recharts_1.Pie>
              <recharts_1.Tooltip />
              <recharts_1.Legend />
            </recharts_1.PieChart>
          </recharts_1.ResponsiveContainer>
        </div>
      </div>
    </div>);
};
exports.default = Expenses;
