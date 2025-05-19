export const mockChildren = [
  {
    id: "c1",
    name: "Arjun Kumar",
    balance: 12500,
  },
  {
    id: "c2",
    name: "Diya Sharma",
    balance: 8900,
  },
];

export const mockTransactions = [
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

export const mockNotifications = [
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

import { Child, Notification, Parent, Transaction } from "./types";

export const mockParents: Parent[] = [
  {
    id: "p1",
    name: "Rohan Kumar",
    email: "rohan.kumar@example.com",
    children: mockChildren,
    notifications: mockNotifications,
  },
];
