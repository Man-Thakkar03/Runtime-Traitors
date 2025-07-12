'use client';
import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadialBarChart, RadialBar, ComposedChart, Legend } from 'recharts';
import { Clock, Zap, CheckCircle, AlertTriangle, ArrowUpRight, Users, Activity, TrendingUp, FileText, MessageSquare, Calendar, BarChart2, Settings, Zap as Lightning, GitMerge, Smartphone, UserPlus, Award, Percent, Clock3, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';
import PollVisualizer from '@/components/global/poll-info/PollVisualizer';
import { 
  dashboardStats, 
  eventsStats, 
  pollsStats, 
  qaStats, 
  settingsStats,
  monthlyTrendData,
  userActivityByTime,
  contentEngagementData,
  deviceDistribution,
  userGrowthStages,
  recentActivityData
} from '@/lib/dashboardData';

// Custom tooltip formatter to display values with appropriate formatting
const formatTooltipValue = (value: number, name: string) => {
  if (name.toLowerCase().includes('rate') || name.toLowerCase().includes('percent')) {
    return `${value}%`;
  } else if (value > 1000) {
    return value.toLocaleString();
  }
  return value;
};

// Color palette for charts
const COLORS = {
  primary: '#8b5cf6',    // Purple
  secondary: '#6366f1',  // Indigo
  tertiary: '#4f46e5',   // Blue
  success: '#10b981',    // Green
  warning: '#f59e0b',    // Amber
  error: '#ef4444',      // Red
  info: '#3b82f6',       // Light Blue
  dark: '#1f2937',       // Dark Gray
  light: '#9ca3af',      // Light Gray
  background: '#1f1f24', // Background
  accent1: '#ec4899',    // Pink
  accent2: '#14b8a6',    // Teal
};

// Chart color arrays for consistent styling
const CHART_COLORS = [COLORS.primary, COLORS.secondary, COLORS.tertiary, COLORS.info, COLORS.success, COLORS.warning];
const PIE_COLORS = [COLORS.primary, COLORS.info, COLORS.success, COLORS.warning, COLORS.accent1, COLORS.accent2];

// Define types for stats and chart data
type StatItem = {
  name: string;
  value: string;
  change: string;
  changeType: string;
};

type ChartDataItem = {
  name: string;
  value: number;
  change: number;
};

// Convert stats to chart data format
const createChartData = (stats: StatItem[]): ChartDataItem[] => {
  return stats.map(stat => ({
    name: stat.name,
    value: parseFloat(stat.value.replace(/,/g, '').replace(/%/g, '').replace(/[a-zA-Z]/g, '')),
    change: parseFloat(stat.change.replace(/\+/g, '').replace(/%/g, '').replace(/[a-zA-Z]/g, ''))
  }));
};

const dashboardChartData = createChartData(dashboardStats);
const eventsChartData = createChartData(eventsStats);
const pollsChartData = createChartData(pollsStats);
const qaChartData = createChartData(qaStats);
const settingsChartData = createChartData(settingsStats);

// Map activity types to icons
const getActivityIcon = (type: string) => {
  switch(type) {
    case 'event': return <Calendar className="h-4 w-4 text-purple-400" />;
    case 'poll': return <BarChart2 className="h-4 w-4 text-blue-400" />;

    case 'qa': return <MessageSquare className="h-4 w-4 text-amber-400" />;

    case 'system': return <Settings className="h-4 w-4 text-gray-400" />;
    default: return <Activity className="h-4 w-4 text-purple-400" />;
  }
};


const StatCard = ({ name, value, change, changeType, icon }: { name: string; value: string; change: string; changeType: 'positive' | 'negative'; icon: React.ReactNode }) => (
  <div className="bg-[#18181b] border border-[#23232A] p-6 rounded-xl hover:border-[#3D3D45] transition-colors relative">
    <div className="flex flex-col">
      <p className="text-sm text-gray-400 mb-1">{name}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
      <div className={`mt-2 text-sm ${changeType === 'positive' ? 'text-green-400' : 'text-red-400'} flex items-center`}>
        {changeType === 'positive' ? (
          <ArrowUpRight className="h-4 w-4 mr-1" />
        ) : (
          <ArrowUpRight className="h-4 w-4 mr-1 transform rotate-90" />
        )}
        {change}
      </div>
    </div>
    <div className="absolute top-5 right-5 p-3 rounded-full bg-white/5">
      {icon}
    </div>
  </div>
);

const SectionHeader = ({ title, icon, viewAll }: { title: string; icon: React.ReactNode; viewAll?: string }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white/5 rounded-lg">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
    </div>
    {viewAll && (
      <button className="text-sm flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors">
        View All
        <ArrowUpRight className="h-4 w-4 transform rotate-45" />
      </button>
    )}
  </div>
);

export default function DashboardPage() {
  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/30">
              <BarChart2 className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 mt-1">Welcome back to your dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-[#1E1E24] px-4 py-2.5 rounded-lg border border-[#2D2D35] hover:bg-white/5 transition-colors cursor-pointer">
              <Clock className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-white/80">Last updated 5 minutes ago</span>
            </div>
            <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <Lightning className="h-5 w-5 text-purple-400" />
            </div>
          </div>
        </div>
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400 bg-[#18181b]/50 px-4 py-2.5 rounded-lg border border-[#23232A] w-fit">
          <span className="hover:text-white transition-colors cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="text-white">Dashboard</span>
        </nav>
      </div>

      {/* Overview Stats */}
      <div className="bg-[#18181b] border border-[#23232A] p-6 rounded-xl">
        <SectionHeader 
          title="Overview" 
          icon={<BarChart2 className="h-5 w-5 text-purple-400" />} 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCard 
            name="Total Members" 
            value={dashboardStats[0].value} 
            change={dashboardStats[0].change} 
            changeType="positive" 
            icon={<Users className="h-6 w-6 text-purple-400" />} 
          />
          <StatCard 
            name="Active Users" 
            value={dashboardStats[1].value} 
            change={dashboardStats[1].change} 
            changeType="positive" 
            icon={<Activity className="h-6 w-6 text-blue-500" />} 
          />
          <StatCard 
            name="Engagement Rate" 
            value={dashboardStats[2].value} 
            change={dashboardStats[2].change} 
            changeType="positive" 
            icon={<TrendingUp className="h-6 w-6 text-green-500" />} 
          />
          <StatCard 
            name="Retention Rate" 
            value={dashboardStats[3].value} 
            change={dashboardStats[3].change} 
            changeType="positive" 
            icon={<Award className="h-6 w-6 text-yellow-400" />} 
          />
          <StatCard 
            name="New Signups" 
            value={dashboardStats[4].value} 
            change={dashboardStats[4].change} 
            changeType="positive" 
            icon={<UserPlus className="h-6 w-6 text-pink-500" />} 
          />
          <StatCard 
            name="Avg. Session" 
            value={dashboardStats[5].value} 
            change={dashboardStats[5].change} 
            changeType="positive" 
            icon={<Clock3 className="h-6 w-6 text-indigo-500" />} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="h-80 bg-[#1A1A1F] p-5 rounded-lg border border-[#23232A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <LineChartIcon className="h-5 w-5 text-purple-400" />
                Member Growth Trend
              </h3>
              <div className="bg-white/5 text-xs text-gray-400 px-3 py-1 rounded-full">
                Last 6 months
              </div>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={monthlyTrendData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D35" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#E5E7EB' }}
                  formatter={(value: number) => [value.toLocaleString(), 'Members']}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke={COLORS.primary} 
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="h-80 bg-[#1A1A1F] p-5 rounded-lg border border-[#23232A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-blue-400" />
                User Distribution
              </h3>
              <div className="bg-white/5 text-xs text-gray-400 px-3 py-1 rounded-full">
                Current quarter
              </div>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={userGrowthStages}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                >
                  {userGrowthStages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#E5E7EB' }}
                  formatter={(value: number) => [value.toLocaleString(), 'Users']}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                  formatter={(value) => <span className="text-gray-400 text-xs">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 bg-[#18181b] border border-[#23232A] p-6 rounded-xl">
          <SectionHeader 
            title="User Growth & Engagement" 
            icon={<TrendingUp className="h-5 w-5 text-purple-400" />} 
          />
          <div className="bg-[#1A1A1F] p-5 rounded-lg border border-[#23232A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-white flex items-center gap-2">
                <LineChartIcon className="h-4 w-4 text-blue-400" />
                Growth Metrics
              </h3>
              <div className="flex gap-2">
                <div className="bg-purple-500/10 border border-purple-500/30 text-xs text-purple-400 px-3 py-1 rounded-full">
                  6 months
                </div>
                <div className="bg-white/5 text-xs text-gray-400 px-3 py-1 rounded-full">
                  YTD
                </div>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D2D35" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#E5E7EB' }}
                    formatter={(value: number, name: string) => {
                      return [value.toLocaleString(), name === 'users' ? 'Members' : name === 'engagement' ? 'Engagement %' : name];
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke={CHART_COLORS[0]} 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, stroke: CHART_COLORS[0], strokeWidth: 2, fill: '#1F1F24' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="posts" 
                    stroke={CHART_COLORS[1]} 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, stroke: CHART_COLORS[1], strokeWidth: 2, fill: '#1F1F24' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke={CHART_COLORS[2]} 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, stroke: CHART_COLORS[2], strokeWidth: 2, fill: '#1F1F24' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-5 mt-4">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[0] }}></span>
                <span className="text-gray-400 ml-2 text-xs">Members</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[1] }}></span>
                <span className="text-gray-400 ml-2 text-xs">Content</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[2] }}></span>
                <span className="text-gray-400 ml-2 text-xs">Engagement %</span>
              </div>
            </div>
          </div>
        </div>

        {/* Device Distribution */}
        <div className="bg-[#18181b] border border-[#23232A] p-6 rounded-xl">
          <SectionHeader 
            title="Device Distribution" 
            icon={<Smartphone className="h-5 w-5 text-blue-400" />} 
          />
          <div className="bg-[#1A1A1F] p-5 rounded-lg border border-[#23232A]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-white flex items-center gap-2">
                <PieChartIcon className="h-4 w-4 text-green-400" />
                Device Usage
              </h3>
              <div className="bg-white/5 text-xs text-gray-400 px-3 py-1 rounded-full">
                Last 30 days
              </div>
            </div>
            <div className="h-60 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                  >
                    {deviceDistribution.map((entry, index: number) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      borderColor: '#374151', 
                      borderRadius: '0.5rem' 
                    }}
                    formatter={(value: number) => [`${value}%`, 'Usage']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-2">
              {deviceDistribution.map((entry: {name: string, value: number}, index: number) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <span 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                  ></span>
                  <span className="text-xs text-gray-300">{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



      {/* Section: Events & Polls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events */}
        <div className="bg-[#18181b] border border-[#23232A] p-6 rounded-xl">
          <SectionHeader 
            title="Events" 
            icon={<Calendar className="h-5 w-5 text-green-400" />} 
            viewAll="/dashboard/events"
          />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventsChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D35" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#E5E7EB' }}
                />
                <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} name="Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-sm">
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              <span className="text-gray-400">Monthly Events</span>
            </div>
          </div>
        </div>

        {/* Polls */}
        <div className="bg-[#18181b] border border-[#23232A] p-6 rounded-xl">
          <SectionHeader 
            title="Polls" 
            icon={<BarChart2 className="h-5 w-5 text-yellow-400" />} 
            viewAll="/dashboard/polls"
          />
          
          {/* Poll Visualizer */}
          <div className="mb-4">
            <PollVisualizer />
          </div>
        </div>
      </div>
    </div>
  );
}
