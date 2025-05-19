
export interface ParentUser {
  id: string;
  name: string;
  email: string;
  children: ChildUser[];
  notifications: Notification[];
}

export interface ChildUser {
  id: string;
  name: string;
  email: string;
  dob: string;
  balance: number;
  parentId?: string;
  savingsGoals: SavingsGoal[];
  transactions: Transaction[];
  fixedDeposits: FixedDeposit[];
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'receive' | 'allowance';
  amount: number;
  recipient?: string;
  sender?: string;
  date: string;
  status: 'pending' | 'completed' | 'rejected';
  note?: string;
}

export interface FixedDeposit {
  id: string;
  amount: number;
  interestRate: number;
  startDate: string;
  maturityDate: string;
  status: 'active' | 'matured';
}

export interface Notification {
  id: string;
  type: 'spending' | 'low_balance' | 'approval_request';
  childId: string;
  childName: string;
  message: string;
  amount?: number;
  date: string;
  read: boolean;
  actions: string[];
}

export const mockParents: ParentUser[] = [
  {
    id: 'p1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    children: [],
    notifications: [
      {
        id: 'n1',
        type: 'spending',
        childId: 'c1',
        childName: 'Arjun Kumar',
        message: '⚠️ Arjun just spent ₹2,350 via UPI.',
        amount: 2350,
        date: '2023-05-18T10:30:00',
        read: false,
        actions: ['Block UPI', 'View Transaction']
      },
      {
        id: 'n2',
        type: 'low_balance',
        childId: 'c1',
        childName: 'Arjun Kumar',
        message: '💡 Arjun has only ₹1,785 remaining.',
        amount: 1785,
        date: '2023-05-18T14:45:00',
        read: false,
        actions: ['Top Up', 'Set Limit']
      },
      {
        id: 'n3',
        type: 'approval_request',
        childId: 'c1',
        childName: 'Arjun Kumar',
        message: '🔔 Arjun wants to create a Fixed Deposit of ₹5,000.',
        amount: 5000,
        date: '2023-05-17T09:15:00',
        read: true,
        actions: ['Approve', 'Reject']
      }
    ]
  }
];

export const mockChildren: ChildUser[] = [
  {
    id: 'c1',
    name: 'Arjun Kumar',
    email: 'arjun@example.com',
    dob: '2010-05-15',
    balance: 1785,
    parentId: 'p1',
    savingsGoals: [
      {
        id: 'sg1',
        name: 'New Bicycle',
        targetAmount: 12000,
        currentAmount: 4500,
        deadline: '2023-08-30'
      },
      {
        id: 'sg2',
        name: 'Gaming Console',
        targetAmount: 35000,
        currentAmount: 8200,
        deadline: '2023-12-25'
      }
    ],
    transactions: [
      {
        id: 't1',
        type: 'payment',
        amount: 2350,
        recipient: 'Book Store',
        date: '2023-05-18T10:30:00',
        status: 'completed',
        note: 'School books'
      },
      {
        id: 't2',
        type: 'receive',
        amount: 5000,
        sender: 'Rajesh Kumar',
        date: '2023-05-15T14:20:00',
        status: 'completed',
        note: 'Monthly allowance'
      },
      {
        id: 't3',
        type: 'payment',
        amount: 850,
        recipient: 'Food Court',
        date: '2023-05-12T13:45:00',
        status: 'completed',
        note: 'Lunch with friends'
      }
    ],
    fixedDeposits: [
      {
        id: 'fd1',
        amount: 10000,
        interestRate: 7.5,
        startDate: '2023-01-10',
        maturityDate: '2023-07-10',
        status: 'active'
      }
    ]
  }
];

// Connect parents to children
mockParents[0].children = mockChildren.filter(child => child.parentId === mockParents[0].id);

export const findParentByEmail = (email: string): ParentUser | undefined => {
  return mockParents.find(parent => parent.email === email);
};

export const findChildByEmail = (email: string): ChildUser | undefined => {
  return mockChildren.find(child => child.email === email);
};

export const isParent = (user: ParentUser | ChildUser): user is ParentUser => {
  return 'children' in user;
};

export const isChild = (user: ParentUser | ChildUser): user is ChildUser => {
  return 'balance' in user;
};
