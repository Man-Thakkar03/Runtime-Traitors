"use client"

// Dashboard Overview Stats
export const dashboardStats = [
  { name: 'Total Members', value: '3,842', change: '+15.7%', changeType: 'positive' },
  { name: 'Active Users', value: '2,156', change: '+8.9%', changeType: 'positive' },
  { name: 'Engagement Rate', value: '68.4%', change: '+5.2%', changeType: 'positive' },
  { name: 'Retention Rate', value: '92.7%', change: '+3.1%', changeType: 'positive' },
  { name: 'New Signups', value: '324', change: '+18.5%', changeType: 'positive' },
  { name: 'Avg. Session', value: '12m 45s', change: '+2.8%', changeType: 'positive' },
];



// Notifications Stats
export const notificationsStats = [
  { name: 'Upcoming Notifications', value: '38', change: '+8', changeType: 'positive' },
  { name: 'Registrations', value: '1,256', change: '+28.8%', changeType: 'positive' },
  { name: 'Avg. Attendance', value: '87.5%', change: '+4.3%', changeType: 'positive' },
  { name: 'Completed Notifications', value: '124', change: '+15', changeType: 'positive' },
  { name: 'Active Organizers', value: '32', change: '+7', changeType: 'positive' },
  { name: 'Avg. Rating', value: '4.8/5', change: '+0.3', changeType: 'positive' },
];

// Polls Stats
export const pollsStats = [
  { name: 'Active Polls', value: '8', change: '+3', changeType: 'positive' },
  { name: 'Total Responses', value: '1,551', change: '+24.3%', changeType: 'positive' },
  { name: 'Response Rate', value: '82.7%', change: '+6.5%', changeType: 'positive' },
  { name: 'Completed Polls', value: '2', change: '+1', changeType: 'positive' },
  { name: 'Avg. Completion Time', value: '2m 45s', change: '-12.8%', changeType: 'positive' },
  { name: 'User Satisfaction', value: '94%', change: '+3.2%', changeType: 'positive' },
];



// Q&A Stats
export const qaStats = [
  { name: 'Open Questions', value: '156', change: '-12', changeType: 'positive' },
  { name: 'Answered Today', value: '78', change: '+41.2%', changeType: 'positive' },
  { name: 'Response Time', value: '2h 15m', change: '-32.4%', changeType: 'positive' },
  { name: 'Solution Rate', value: '84.5%', change: '+6.3%', changeType: 'positive' },
  { name: 'Top Contributors', value: '24', change: '+7', changeType: 'positive' },
  { name: 'Knowledge Base', value: '345', change: '+28', changeType: 'positive' },
];

// Automation Stats
export const automationStats = [
  { name: 'Active Workflows', value: '68', change: '+12', changeType: 'positive' },
  { name: 'Tasks Automated', value: '18,456', change: '+42.1%', changeType: 'positive' },
  { name: 'Time Saved', value: '384h', change: '+25.4%', changeType: 'positive' },
  { name: 'Success Rate', value: '99.7%', change: '+0.5%', changeType: 'positive' },
  { name: 'Error Rate', value: '0.3%', change: '-0.5%', changeType: 'positive' },
  { name: 'ROI', value: '345%', change: '+28.3%', changeType: 'positive' },
];



// Settings Stats
export const settingsStats = [
  { name: 'System Health', value: '99.2%', change: '+0.7%', changeType: 'positive' },
  { name: 'Last Backup', value: '1h ago', change: 'On Schedule', changeType: 'positive' },
  { name: 'Security Score', value: '96/100', change: '+4', changeType: 'positive' },
  { name: 'Active Sessions', value: '342', change: '+18.3%', changeType: 'positive' },
  { name: 'Response Time', value: '84ms', change: '-12.5%', changeType: 'positive' },
  { name: 'Storage Used', value: '68.4%', change: '+5.2%', changeType: 'neutral' },
];

// Monthly Trend Data
export const monthlyTrendData = [
  { name: 'Jan', users: 2840, notifications: 18, engagement: 62, revenue: 12400 },
  { name: 'Feb', users: 3120, notifications: 22, engagement: 68, revenue: 15600 },
  { name: 'Mar', users: 3580, notifications: 25, engagement: 72, revenue: 18900 },
  { name: 'Apr', users: 3780, notifications: 28, engagement: 75, revenue: 22400 },
  { name: 'May', users: 3920, notifications: 32, engagement: 78, revenue: 25800 },
  { name: 'Jun', users: 4150, notifications: 36, engagement: 82, revenue: 28500 },
];

// User Activity by Time
export const userActivityByTime = [
  { hour: '00:00', users: 245 },
  { hour: '02:00', users: 125 },
  { hour: '04:00', users: 85 },
  { hour: '06:00', users: 210 },
  { hour: '08:00', users: 845 },
  { hour: '10:00', users: 1245 },
  { hour: '12:00', users: 1580 },
  { hour: '14:00', users: 1720 },
  { hour: '16:00', users: 1850 },
  { hour: '18:00', users: 1650 },
  { hour: '20:00', users: 1280 },
  { hour: '22:00', users: 780 },
];

// Content Engagement by Type
export const contentEngagementData = [
  { type: 'Notifications', engagement: 82 },
  { type: 'Polls', engagement: 74 },
  { type: 'Q&A', engagement: 68 },
];

// Device Distribution
export const deviceDistribution = [
  { name: 'Mobile', value: 58 },
  { name: 'Desktop', value: 32 },
  { name: 'Tablet', value: 10 },
];

// User Growth Stages
export const userGrowthStages = [
  { name: 'New', value: 842 },
  { name: 'Active', value: 2156 },
  { name: 'Engaged', value: 1458 },
  { name: 'Power Users', value: 386 },
];

// Recent Activity
export const recentActivityData = [
  { id: 1, user: 'Alex Johnson', action: 'created a new notification', time: '2 min ago', type: 'notification' },
  { id: 2, user: 'Maria Garcia', action: 'responded to a poll', time: '5 min ago', type: 'poll' },

  { id: 4, user: 'Sarah Miller', action: 'answered a question', time: '18 min ago', type: 'qa' },

  { id: 6, user: 'Emma Taylor', action: 'registered for a notification', time: '32 min ago', type: 'notification' },
  { id: 7, user: 'Michael Brown', action: 'created a new poll', time: '45 min ago', type: 'poll' },
  { id: 8, user: 'System', action: 'scheduled backup completed', time: '1 hour ago', type: 'system' },
];
