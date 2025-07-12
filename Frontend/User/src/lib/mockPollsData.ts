"use client";

export interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: number;
  created: string;
  status: 'active' | 'ended';
  participants: number;
  endDate: string | null;
}

// Mock data for polls that can be used across the application
export const mockPolls: Poll[] = [
  {
    id: '1',
    question: 'What programming language do you prefer?',
    options: ['JavaScript', 'Python', 'Java', 'C#', 'Go'],
    votes: 145,
    created: '2025-05-10T15:30:00',
    status: 'active',
    participants: 145,
    endDate: '2025-05-30T15:30:00'
  },
  {
    id: '2',
    question: 'Which frontend framework is your favorite?',
    options: ['React', 'Vue', 'Angular', 'Svelte'],
    votes: 98,
    created: '2025-05-05T10:15:00',
    status: 'active',
    participants: 98,
    endDate: null
  },
  {
    id: '3',
    question: 'How often do you contribute to open source?',
    options: ['Weekly', 'Monthly', 'Occasionally', 'Never'],
    votes: 213,
    created: '2025-04-28T09:20:00',
    status: 'ended',
    participants: 213,
    endDate: '2025-05-12T09:20:00'
  },
  {
    id: '4',
    question: 'What is your preferred deployment method?',
    options: ['Docker', 'AWS', 'Vercel', 'Other'],
    votes: 56,
    created: '2025-05-15T14:00:00',
    status: 'active',
    participants: 56,
    endDate: '2025-06-15T14:00:00'
  },
  {
    id: '5',
    question: 'What database do you use for your projects?',
    options: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite', 'Firebase'],
    votes: 189,
    created: '2025-05-17T08:45:00',
    status: 'active',
    participants: 189,
    endDate: '2025-06-17T08:45:00'
  },
  {
    id: '6',
    question: 'How do you prefer to style your applications?',
    options: ['Tailwind CSS', 'CSS Modules', 'Styled Components', 'Sass/SCSS', 'Vanilla CSS'],
    votes: 142,
    created: '2025-05-16T11:20:00',
    status: 'active',
    participants: 142,
    endDate: null
  },
  {
    id: '7',
    question: 'Which state management solution do you prefer?',
    options: ['Redux', 'Context API', 'Zustand', 'MobX', 'Recoil'],
    votes: 112,
    created: '2025-05-09T14:15:00',
    status: 'active',
    participants: 112,
    endDate: '2025-06-09T14:15:00'
  },
  {
    id: '8',
    question: 'How many hours do you code per day?',
    options: ['Less than 4', '4-6 hours', '6-8 hours', '8+ hours'],
    votes: 231,
    created: '2025-04-30T09:30:00',
    status: 'ended',
    participants: 231,
    endDate: '2025-05-15T09:30:00'
  },
  {
    id: '9',
    question: 'What is your preferred IDE/code editor?',
    options: ['VS Code', 'WebStorm/IntelliJ', 'Sublime Text', 'Vim', 'Atom', 'Notepad++'],
    votes: 287,
    created: '2025-05-02T16:40:00',
    status: 'active',
    participants: 287,
    endDate: '2025-06-02T16:40:00'
  },
  {
    id: '10',
    question: 'Which testing framework do you prefer?',
    options: ['Jest', 'Vitest', 'Playwright', 'Cypress', 'React Testing Library'],
    votes: 78,
    created: '2025-05-19T10:00:00',
    status: 'active',
    participants: 78,
    endDate: '2025-06-19T10:00:00'
  }
];

// Generate mock results for a specific poll
export function generatePollResults(pollId: string) {
  const poll = mockPolls.find(p => p.id === pollId);
  
  if (!poll) return null;
  
  // Generate random distribution of votes
  const results = poll.options.map(option => ({
    option,
    votes: Math.floor(Math.random() * 100) + 1
  }));
  
  // Adjust the total to match the poll's total votes
  const totalGenerated = results.reduce((sum, item) => sum + item.votes, 0);
  const scaleFactor = poll.votes / totalGenerated;
  
  const adjustedResults = results.map((result, index, array) => {
    // For the last item, make sure the total adds up exactly
    if (index === array.length - 1) {
      const currentSum = array.slice(0, -1).reduce((sum, item) => 
        sum + Math.round(item.votes * scaleFactor), 0);
      return {
        option: result.option,
        votes: poll.votes - currentSum
      };
    }
    
    return {
      option: result.option,
      votes: Math.round(result.votes * scaleFactor)
    };
  });
  
  return {
    pollId: poll.id,
    question: poll.question,
    totalVotes: poll.votes,
    results: adjustedResults
  };
}

// Get recent polls (last 7 days)
export function getRecentPolls() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  return mockPolls.filter(poll => new Date(poll.created) >= sevenDaysAgo)
    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
}

// Get trending polls (most votes in the last 14 days)
export function getTrendingPolls() {
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
  
  return mockPolls.filter(poll => new Date(poll.created) >= fourteenDaysAgo)
    .sort((a, b) => b.votes - a.votes);
}
