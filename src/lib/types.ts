
export interface Child {
  id: string;
  name: string;
  balance: number;
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
