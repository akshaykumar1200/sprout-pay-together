
import { Child, Notification, Parent, Transaction, SavingsGoal, FixedDeposit, Reward, MonthlyReport } from "./types";

// Define transactions first to avoid the "used before declaration" errors
const mockTransactions: Transaction[] = [
  {
    id: "t1",
    type: "allowance",
    amount: 2000,
    date: "2023-05-01",
    recipient: "Arjun Kumar",
  },
  {
    id: "t2",
    type: "payment",
    amount: 350,
    date: "2023-05-03",
    recipient: "Online Bookstore",
  },
  {
    id: "t3",
    type: "payment",
    amount: 1200,
    date: "2023-05-05",
    recipient: "Gaming Platform",
  },
  {
    id: "t4",
    type: "transfer",
    amount: 500,
    date: "2023-05-07",
    recipient: "Diya Sharma",
  },
  {
    id: "t5",
    type: "payment",
    amount: 800,
    date: "2023-05-10",
    recipient: "Music Streaming Service",
  },
  {
    id: "t6",
    type: "allowance",
    amount: 2000,
    date: "2023-05-15",
    recipient: "Arjun Kumar",
  },
  {
    id: "t7",
    type: "payment",
    amount: 400,
    date: "2023-05-17",
    recipient: "Local Cafe",
  },
];

export const mockChildren: Child[] = [
  {
    id: "c1",
    name: "Arjun Kumar",
    balance: 12500,
    transactions: mockTransactions.filter(t => t.recipient === "Arjun Kumar" || t.id.startsWith("t")),
    savingsGoals: [
      {
        id: "sg1",
        name: "New Bicycle",
        targetAmount: 8000,
        currentAmount: 5000,
        deadline: "2023-08-30"
      },
      {
        id: "sg2",
        name: "Video Game",
        targetAmount: 4000,
        currentAmount: 2500,
        deadline: "2023-07-15"
      }
    ],
    fixedDeposits: [
      {
        id: "fd1",
        amount: 5000,
        term: 6,
        interestRate: 5.5,
        startDate: "2023-01-15",
        maturityDate: "2023-07-15"
      }
    ],
    rewards: [
      {
        id: "r1",
        name: "Smart Saver",
        description: "Saved more than 50% of money received",
        earnedDate: "2023-04-20",
        type: "badge"
      },
      {
        id: "r2",
        name: "First Goal Achieved",
        description: "Successfully completed first savings goal",
        earnedDate: "2023-03-10",
        type: "achievement"
      }
    ]
  },
  {
    id: "c2",
    name: "Diya Sharma",
    balance: 8900,
    transactions: mockTransactions.filter(t => t.recipient === "Diya Sharma"),
    savingsGoals: [
      {
        id: "sg3",
        name: "School Trip",
        targetAmount: 10000,
        currentAmount: 7000,
        deadline: "2023-09-10"
      }
    ],
    fixedDeposits: [
      {
        id: "fd2",
        amount: 3000,
        term: 12,
        interestRate: 6.0,
        startDate: "2023-02-01",
        maturityDate: "2024-02-01"
      }
    ],
    rewards: [
      {
        id: "r3",
        name: "Regular Saver",
        description: "Saved consistently for 3 months",
        earnedDate: "2023-05-01",
        type: "badge"
      }
    ]
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    message: "Arjun spent ₹350 at Online Bookstore",
    date: "2023-05-03",
    type: "spending",
    read: false,
    actions: ["View Details", "Dismiss"],
  },
  {
    id: "n2",
    message: "Diya's balance is low. Top up now?",
    date: "2023-05-06",
    type: "low_balance",
    read: false,
    actions: ["Top Up", "Ignore"],
  },
  {
    id: "n3",
    message: "Arjun received ₹500 from you",
    date: "2023-05-07",
    type: "transfer",
    read: true,
    actions: ["View Details"],
  },
  {
    id: "n4",
    message: "Payment of ₹800 to Music Streaming Service",
    date: "2023-05-10",
    type: "spending",
    read: true,
    actions: ["View Details"],
  },
];

export const mockMonthlyReports: Record<string, MonthlyReport> = {
  "arjun-2023-05": {
    month: "May",
    year: 2023,
    totalSpent: 2750,
    totalSaved: 1250,
    fdsCreated: 1,
    goalsAchieved: 0,
    rewardsEarned: 1,
    transactions: mockTransactions.filter(t => 
      t.date.startsWith("2023-05") && 
      (t.recipient === "Arjun Kumar" || t.id.startsWith("t"))
    )
  },
  "diya-2023-05": {
    month: "May",
    year: 2023,
    totalSpent: 1200,
    totalSaved: 800,
    fdsCreated: 0,
    goalsAchieved: 1,
    rewardsEarned: 1,
    transactions: mockTransactions.filter(t => 
      t.date.startsWith("2023-05") && 
      t.recipient === "Diya Sharma"
    )
  }
};

export const mockParents: Parent[] = [
  {
    id: "p1",
    name: "Rohan Kumar",
    email: "rohan.kumar@example.com",
    children: mockChildren,
    notifications: mockNotifications,
  },
];

// Export the Transaction type to resolve import issues
export { mockTransactions };

// Helper functions to find users by email
export const findParentByEmail = (email: string): Parent | undefined => {
  return mockParents.find(parent => parent.email === email);
};

export const findChildByEmail = (email: string): Child | undefined => {
  // Just for demonstration, in a real app, children would have email addresses
  return mockChildren.find(child => child.name.toLowerCase().includes(email.split('@')[0].toLowerCase()));
};
