// Mock users with more variety
export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: '3',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: '4',
    name: 'Emily Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: '5',
    name: 'Michael Brown',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: '6',
    name: 'Sophia Davis',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    id: '7',
    name: 'Daniel Miller',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
  },
  {
    id: '8',
    name: 'Olivia Garcia',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  }
];

// Content templates with more interesting posts about tech, automation, and industry trends
export const contentTemplates = [
  "Just launched our new automation suite for e-commerce businesses. It's incredible how much time this saves on inventory management! #Automation #Ecommerce",
  "Attended an amazing webinar on AI-powered workflow optimization. The future of business processes is here! #AI #WorkflowAutomation",
  "Our team has been using the new Slice platform for marketing automation and the ROI has been phenomenal. Highly recommend trying it out! #MarketingAutomation #ROI",
  "The integration between our CRM and email platform has reduced manual data entry by 85%. Automation is a game-changer! #CRM #Integration",
  "Just read an insightful article on how automation is reshaping customer service. Chatbots are becoming surprisingly effective! #CustomerService #Chatbots",
  "Excited to announce that we've automated our entire reporting process. What used to take days now happens in minutes! #ReportAutomation #BusinessIntelligence",
  "The new drag-and-drop automation builder we implemented has empowered our non-technical team members to create their own workflows. #NoCode #Empowerment",
  "Been experimenting with automated social media posting schedules and our engagement has increased by 40%! #SocialMedia #EngagementMetrics",
  "Our DevOps team just set up an impressive CI/CD pipeline that has cut deployment time in half. #DevOps #ContinuousIntegration",
  "Fascinating case study on how a manufacturing company saved millions through supply chain automation. #SupplyChain #Manufacturing",
  "The rise of RPA (Robotic Process Automation) is transforming finance departments across industries. #RPA #FinancialOperations",
  "Just implemented webhook automations between our project management and customer success tools. Game changer! #Webhooks #CustomerSuccess",
  "AI-powered content creation tools are getting remarkably good. Just tested one for our blog and was impressed! #ContentCreation #AIWriting",
  "Our automated lead scoring system has increased sales conversion rates by 25%. Quality over quantity! #LeadScoring #SalesOptimization",
  "Automation isn't just about efficiency—it's about reducing human error. Our error rates have dropped significantly since automating QA. #QualityAssurance #ErrorReduction",
  "The IoT sensors we installed last month are now feeding real-time data into our automated maintenance system. Predictive maintenance is the future! #IoT #PredictiveMaintenance",
  "Ethical considerations in automation: Just attended a thought-provoking panel on balancing efficiency with human jobs. #EthicalAutomation #FutureOfWork",
  "Implemented automated A/B testing for our email campaigns and discovered some surprising insights about our audience. #ABTesting #EmailMarketing",
  "Our HR team just automated the initial resume screening process using AI. The time savings are substantial! #HRAutomation #Recruitment",
  "The integration of machine learning in our recommendation engine has boosted customer engagement significantly. #MachineLearning #PersonalizedRecommendations"
];

// Trending topics related to automation and tech
export const mockTrending = [
  { id: '1', name: '#Automation', count: 1200 },
  { id: '2', name: '#AI', count: 950 },
  { id: '3', name: '#WorkflowOptimization', count: 800 },
  { id: '4', name: '#NoCode', count: 750 },
  { id: '5', name: '#DigitalTransformation', count: 680 },
  { id: '6', name: '#RPA', count: 550 },
  { id: '7', name: '#MachineLearning', count: 520 },
  { id: '8', name: '#BusinessProcess', count: 490 },
  { id: '9', name: '#IntegrationPlatforms', count: 410 },
  { id: '10', name: '#FutureOfWork', count: 380 }
];

// Function to generate a random date within the last month
export const getRandomRecentDate = () => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
  return pastDate.toISOString();
};

// Generate mock posts with the above data
export const generateMockPosts = (count: number, page: number = 1) => {
  return Array.from({ length: count }, (_, i) => {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const randomContent = contentTemplates[Math.floor(Math.random() * contentTemplates.length)];
    
    return {
      id: `post-${page}-${i + 1}`,
      user: randomUser,
      content: randomContent,
      timestamp: getRandomRecentDate(),
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 50)
    };
  });
};
