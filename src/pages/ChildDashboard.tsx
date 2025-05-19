
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { mockChildren } from "@/lib/mockData";
import { Home, CreditCard, Target, PiggyBank, Users, LogOut } from "lucide-react";
import UPIPayment from "@/components/ChildComponents/UPIPayment";
import SavingsGoal from "@/components/ChildComponents/SavingsGoal";
import ChildCreateFD from "@/components/ChildComponents/CreateFD";
import AddParent from "@/components/ChildComponents/AddParent";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const ChildDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const user = mockChildren[0];
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-sprout-blue/5">
      <header className="bg-white dark:bg-gray-900 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PiggyBank className="h-8 w-8 text-sprout-blue" />
            <h1 className="text-xl font-bold">Sprout Pay Together</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-sprout-blue flex items-center justify-center text-white font-medium">
                {user.name.charAt(0)}
              </div>
              <span className="hidden md:inline font-medium">{user.name}</span>
            </div>
            
            <button 
              className="text-muted-foreground hover:text-red-500 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 shrink-0">
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">My Wallet</p>
                  </div>
                  <p className="text-xl font-bold">₹{user.balance.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible">
              <button
                className={`flex items-center gap-2 p-3 rounded-lg w-full mb-1 ${
                  activeTab === "overview"
                    ? "bg-sprout-blue text-white"
                    : "hover:bg-sprout-blue/10 text-muted-foreground"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                <Home className="h-5 w-5" />
                <span className="whitespace-nowrap">My Dashboard</span>
              </button>
              <button
                className={`flex items-center gap-2 p-3 rounded-lg w-full mb-1 ${
                  activeTab === "payment"
                    ? "bg-sprout-blue text-white"
                    : "hover:bg-sprout-blue/10 text-muted-foreground"
                }`}
                onClick={() => setActiveTab("payment")}
              >
                <CreditCard className="h-5 w-5" />
                <span className="whitespace-nowrap">Make a Payment</span>
              </button>
              <button
                className={`flex items-center gap-2 p-3 rounded-lg w-full mb-1 ${
                  activeTab === "savings-goals"
                    ? "bg-sprout-blue text-white"
                    : "hover:bg-sprout-blue/10 text-muted-foreground"
                }`}
                onClick={() => setActiveTab("savings-goals")}
              >
                <Target className="h-5 w-5" />
                <span className="whitespace-nowrap">Savings Goals</span>
              </button>
              <button
                className={`flex items-center gap-2 p-3 rounded-lg w-full mb-1 ${
                  activeTab === "fixed-deposit"
                    ? "bg-sprout-blue text-white"
                    : "hover:bg-sprout-blue/10 text-muted-foreground"
                }`}
                onClick={() => setActiveTab("fixed-deposit")}
              >
                <PiggyBank className="h-5 w-5" />
                <span className="whitespace-nowrap">Fixed Deposit</span>
              </button>
              <button
                className={`flex items-center gap-2 p-3 rounded-lg w-full mb-1 ${
                  activeTab === "add-parent"
                    ? "bg-sprout-blue text-white"
                    : "hover:bg-sprout-blue/10 text-muted-foreground"
                }`}
                onClick={() => setActiveTab("add-parent")}
              >
                <Users className="h-5 w-5" />
                <span className="whitespace-nowrap">Add Parent</span>
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Hi, {user.name}!</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Your Savings Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {user.savingsGoals.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                          No savings goals yet
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {user.savingsGoals.map((goal) => (
                            <div key={goal.id} className="space-y-2">
                              <div className="flex justify-between">
                                <h4 className="font-medium">{goal.name}</h4>
                                <p className="text-sm font-semibold">
                                  {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                                </p>
                              </div>
                              <Progress
                                value={(goal.currentAmount / goal.targetAmount) * 100}
                                className="h-2 bg-sprout-gray-light"
                              />
                            </div>
                          ))}
                          
                          <button 
                            className="text-sm text-sprout-blue hover:underline w-full text-center pt-2"
                            onClick={() => setActiveTab("savings-goals")}
                          >
                            View all goals
                          </button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {user.transactions.slice(0, 3).map((transaction) => (
                          <div key={transaction.id} className="flex justify-between items-center p-2 border-b last:border-0">
                            <div>
                              <p className="text-sm font-medium">
                                {transaction.type === "payment" ? "Payment to " : "Received from "}
                                {transaction.recipient || transaction.sender}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(transaction.date).toLocaleDateString()}
                              </p>
                            </div>
                            <p className={`font-medium ${
                              transaction.type === "payment" ? "text-red-500" : "text-green-500"
                            }`}>
                              {transaction.type === "payment" ? "-" : "+"}₹{transaction.amount}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Your Fixed Deposits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {user.fixedDeposits.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                          No fixed deposits yet
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {user.fixedDeposits.map((fd) => (
                            <div key={fd.id} className="p-4 border rounded-lg">
                              <div className="flex justify-between">
                                <div>
                                  <p className="font-medium">₹{fd.amount.toLocaleString()}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {fd.interestRate}% interest
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium">Matures on</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(fd.maturityDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          <button 
                            className="text-sm text-sprout-blue hover:underline w-full text-center pt-2"
                            onClick={() => setActiveTab("fixed-deposit")}
                          >
                            Create a new Fixed Deposit
                          </button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "payment" && <UPIPayment />}
            {activeTab === "savings-goals" && <SavingsGoal />}
            {activeTab === "fixed-deposit" && <ChildCreateFD />}
            {activeTab === "add-parent" && <AddParent />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildDashboard;
