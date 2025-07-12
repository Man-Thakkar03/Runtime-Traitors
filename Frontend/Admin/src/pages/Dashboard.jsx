import React from "react";

const tabs = ["All", "Social Media", "Marketing", "Productivity", "Analytics"];
const stats = [
  { label: "Total Integrations", value: 5 },
  { label: "Connected", value: 2 },
  { label: "Available", value: 3 }
];
const cards = [
  { title: "Instagram", desc: "Connect your Instagram account to schedule posts.", status: "Connected", statusColor: "bg-green-600" },
  { title: "Salesforce", desc: "Sync customer data and manage your CRM.", status: "Connect", statusColor: "bg-transparent text-white border border-blue-500" },
  { title: "Slack", desc: "Get notifications and updates in your Slack workspace.", status: "Connect", statusColor: "bg-transparent text-white border border-blue-500" }
];

const Dashboard = () => (
  <div className="min-h-screen bg-[#0a0a13] text-white p-8 font-rajdhani">
    <h1 className="text-4xl font-bold mb-6">Integrations</h1>
    <p className="text-gray-400 mb-4">Connect your favorite tools and services</p>

    {/* Tabs */}
    <div className="flex gap-3 mb-6">
      {tabs.map(tab => (
        <button
          key={tab}
          className="px-4 py-2 rounded-full bg-[#1c1f2a] hover:bg-[#323547] transition"
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map(s => (
        <div className="bg-[#0f0f1a] rounded-xl p-6 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">{s.label}</p>
            <p className="text-3xl font-semibold mt-1">{s.value}</p>
          </div>
          <div className="text-3xl">⚡</div>
        </div>
      ))}
    </div>

    {/* Integration Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map(c => (
        <div key={c.title} className="bg-[#0f0f1a] rounded-2xl p-6 shadow-lg border border-gray-700 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold">{c.title}</h3>
            <p className="text-gray-300 mt-2">{c.desc}</p>
          </div>
          <button className={`${c.statusColor} px-4 py-2 rounded-full mt-4 self-end transition`}>
            {c.status}
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Dashboard;
