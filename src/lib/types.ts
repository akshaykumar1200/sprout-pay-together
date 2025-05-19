
export interface Child {
  id: string;
  name: string;
  balance: number;
  transactions?: Transaction[];
  savingsGoals?: SavingsGoal[];
  fixedDeposits?: FixedDeposit[];
  rewards?: Reward[];
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  recipient?: string;
}

export interface Notification {
  id: string;
  message: string;
  date: string;
  type: string;
  read: boolean;
  actions: string[];
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  children: Child[];
  notifications: Notification[];
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
}

export interface FixedDeposit {
  id: string;
  amount: number;
  term: number; // in months
  interestRate: number;
  startDate: string;
  maturityDate: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  earnedDate: string;
  type: 'badge' | 'achievement';
}

export interface MonthlyReport {
  month: string;
  year: number;
  totalSpent: number;
  totalSaved: number;
  fdsCreated: number;
  goalsAchieved: number;
  rewardsEarned: number;
  transactions: Transaction[];
}
