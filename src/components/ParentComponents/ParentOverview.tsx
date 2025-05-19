
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Parent } from "@/lib/mockData";

interface ParentOverviewProps {
  user: Parent;
  onTabChange: (tab: string) => void;
}

const ParentOverview: React.FC<ParentOverviewProps> = ({ user, onTabChange }) => {
  const unreadNotifications = user.notifications.filter(n => !n.read).length;
  
  return (
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
                      onClick={() => onTabChange("send")}
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
                          onClick={() => onTabChange("notifications")}
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
                    onClick={() => onTabChange("notifications")}
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
  );
}

export default ParentOverview;
