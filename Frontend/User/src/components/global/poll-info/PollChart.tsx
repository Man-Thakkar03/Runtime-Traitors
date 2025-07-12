"use client";

import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";

// More vibrant colors that work well on dark backgrounds
const COLORS = ["#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

interface PollChartProps {
  options: string[];
  isDark?: boolean;
}

export default function PollChart({ options, isDark = false }: PollChartProps) {
  // Filter out empty options and generate random data
  const filteredOptions = options.filter(opt => opt.trim() !== "");
  
  const data = filteredOptions.map((opt, idx) => ({
    name: opt || `Option ${idx + 1}`,
    value: Math.floor(Math.random() * 100) + 1,
  }));

  // If no valid options, show empty state
  if (data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 rounded-lg border border-dashed ${
        isDark ? "border-[#3D3D45] bg-[#23232A]" : "border-gray-300 bg-gray-50"
      }`}>
        <p className={isDark ? "text-gray-500" : "text-gray-500"}>
          Add options to see preview
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <RechartsTooltip 
          formatter={(value) => [`${value} votes`, 'Votes']}
          contentStyle={{ 
            backgroundColor: isDark ? '#1F2937' : '#fff',
            borderColor: isDark ? '#374151' : '#e2e8f0',
            color: isDark ? '#e5e7eb' : '#1f2937'
          }}
        />
        <Legend 
          formatter={(value) => (
            <span className={isDark ? "text-gray-300" : "text-gray-700"}>
              {value}
            </span>
          )} 
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
