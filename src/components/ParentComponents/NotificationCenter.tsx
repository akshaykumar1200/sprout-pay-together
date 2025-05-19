import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, EyeOff, ArrowUpRight, CreditCard, Wallet } from "lucide-react";
import { Notification } from "@/lib/types";
import { mockParents } from "@/lib/mockData";

const NotificationCenter: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>(mockParents[0]?.notifications || []);

  const handleAction = (notificationId: string, action: string) => {
    toast({
      title: "Action taken",
      description: `You chose to ${action}`,
    });
    
    // Mark notification as read
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const handleDismiss = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    toast({
      title: "Notification dismissed",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "spending":
        return <CreditCard className="h-5 w-5 text-red-500" />;
      case "low_balance":
        return <Wallet className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-sprout-purple" />;
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-sprout-purple" />
          <CardTitle>Notifications</CardTitle>
        </div>
        <CardDescription>
          Stay informed about your child's financial activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No notifications at the moment
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg relative ${
                  notification.read ? "bg-transparent" : "bg-sprout-gray-light/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-grow">
                    <p className="text-sm mb-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      {new Date(notification.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      · {new Date(notification.date).toLocaleDateString()}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {notification.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction(notification.id, action)}
                          className={
                            index === 0
                              ? "bg-sprout-purple/10 hover:bg-sprout-purple/20 text-sprout-purple border-sprout-purple/30"
                              : ""
                          }
                        >
                          {action}
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-foreground"
                  onClick={() => handleDismiss(notification.id)}
                >
                  <EyeOff className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
