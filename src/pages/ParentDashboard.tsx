
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { mockParents } from "@/lib/mockData";
import { Home, Send, PiggyBank, Activity, CalendarDays, Bell, LogOut } from "lucide-react";
import SendMoney from "@/components/ParentComponents/SendMoney";
import CreateFD from "@/components/ParentComponents/CreateFD";
import ActivityApproval from "@/components/ParentComponents/ActivityApproval";
import AllowanceRules from "@/components/ParentComponents/AllowanceRules";
import NotificationCenter from "@/components/ParentComponents/NotificationCenter";
import { useNavigate } from "react-router-dom";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const user = mockParents[0];
  
  const unreadNotifications = user.notifications.filter(n => !n.read).length;

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
    <div className="min-h-screen bg-gradient-to-b from-background to-sprout-purple/5">
      <header className="bg-white dark:bg-gray-900 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PiggyBank className="h-8 w-8 text-sprout-purple" />
            <h1 className="text-xl font-bold">Sprout Pay Together</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className="relative"
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-sprout-purple flex items-center justify-center text-white font-medium">
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
                    <p className="text-sm font-medium">Parent Account</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible">
              <button
                className={`flex items-center gap-2 p-3 rounded-lg w-full mb-1 ${
                  activeTab === "overview"
                    ? "bg-sprout-purple text-white"
                    : "hover:bg-sprout-purple/10 text-muted-foreground"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                <Home className="h-5 w-5" />
                <span className="whitespace-nowrap">Overview</span>
              </button>
              <button
                className={`flex items-center gap-2 p-3 rounded-lg w-full mb-1 ${
                  activeTab === "send"
                    ? "bg-sprout-purple text-white"
                    : "hover:bg-sprout-purple/10 text-muted-foreground"
                }`}
                onClick={() => setActiveTab("send")}
              >
                <Send className="h-5 w-5" />
                <span className="whitespace-nowrap">Send Money</span>
              </button>
              <button
                className={`flex items-center gap-2 p-3 rounded-lg w-full mb-1 ${
                  activeTab === "fixed-deposit"
                    ? "bg-sprout-purple text-white"
                    : "hover:bg-sprout-purple/10 text-muted-foreground"
                }`}
                onClick={() => setActiveTab("fixed-deposit")}
              >
                <PiggyBank className="h-5 w-5" />
                <span className="whitespace-nowrap">Fixed Deposit</span>
              </button>
              <button
                className={`flex items-center gap-2 p-3 rounded-lg w-full mb-1 ${
                  activeTab === "activity"
                    ? "bg-sprout-purple text-white"
                    : "hover:bg-sprout-purple/10 text-muted-foreground"
                }`}
                onClick={() => setActiveTab("activity")}
              >
                <Activity className="h-5 w-5" />
                <span className="whitespace-nowrap">Activity</span>
              </button>
              <button
                className={`flex items-center gap-2 p-3 rounded-lg w-full mb-1 ${
                  activeTab === "allowance"
                    ? "bg-sprout-purple text-white"
                    : "hover:bg-sprout-purple/10 text-muted-foreground"
                }`}
                onClick={() => setActiveTab("allowance")}
              >
                <CalendarDays className="h-5 w-5" />
                <span className="whitespace-nowrap">Allowance</span>
              </button>
              <button
                className={`flex items-center gap-2 p-3 rounded-lg w-full mb-1 ${
                  activeTab === "notifications"
                    ? "bg-sprout-purple text-white"
                    : "hover:bg-sprout-purple/10 text-muted-foreground"
                }`}
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="h-5 w-5" />
                <span className="whitespace-nowrap">Notifications</span>
                {unreadNotifications > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Welcome back, {user.name}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Children</CardTitle>
                      <CardDescription>Manage your children's accounts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {user.children.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                          No children accounts connected yet
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {user.children.map((child) => (
                            <div key={child.id} className="flex items-center justify-between p-3 bg-sprout-gray-light/30 rounded-lg">
                              <div>
                                <h4 className="font-medium">{child.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Balance: ₹{child.balance.toLocaleString()}
                                </p>
                              </div>
                              <button 
                                className="text-xs bg-sprout-purple/10 text-sprout-purple hover:bg-sprout-purple/20 px-3 py-1 rounded"
                                onClick={() => setActiveTab("send")}
                              >
                                Send Money
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                      <CardDescription>Latest transactions and actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {user.children[0]?.transactions.slice(0, 3).map((transaction) => (
                          <div key={transaction.id} className="flex justify-between items-center p-2 border-b last:border-0">
                            <div>
                              <p className="text-sm font-medium">
                                {transaction.type === "payment" ? "Payment to " : "Money sent to "}
                                {transaction.recipient || user.children[0].name}
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
                        
                        {user.children[0]?.transactions.length === 0 && (
                          <div className="text-center py-6 text-muted-foreground">
                            No recent activity
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Pending Actions</CardTitle>
                      <CardDescription>Items that need your attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {unreadNotifications > 0 ? (
                        <div className="space-y-3">
                          {user.notifications.filter(n => !n.read).slice(0, 2).map((notification) => (
                            <div key={notification.id} className="p-3 bg-sprout-orange/10 border border-sprout-orange/20 rounded-lg">
                              <p className="font-medium">{notification.message}</p>
                              <div className="flex gap-2 mt-3">
                                {notification.actions.map((action, i) => (
                                  <button 
                                    key={i}
                                    className={`text-xs px-3 py-1 rounded ${
                                      i === 0
                                        ? "bg-sprout-purple text-white"
                                        : "bg-sprout-gray-light text-foreground"
                                    }`}
                                    onClick={() => setActiveTab("notifications")}
                                  >
                                    {action}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                          
                          {user.notifications.filter(n => !n.read).length > 2 && (
                            <button 
                              className="w-full text-center text-sm text-sprout-purple hover:underline"
                              onClick={() => setActiveTab("notifications")}
                            >
                              View all notifications
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          No pending actions
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "send" && <SendMoney />}
            {activeTab === "fixed-deposit" && <CreateFD />}
            {activeTab === "activity" && <ActivityApproval />}
            {activeTab === "allowance" && <AllowanceRules />}
            {activeTab === "notifications" && <NotificationCenter />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
