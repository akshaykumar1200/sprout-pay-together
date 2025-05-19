
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home, 
  Send, 
  PiggyBank, 
  Activity, 
  CalendarDays, 
  Bell 
} from "lucide-react";
import { Parent } from "@/lib/mockData";

interface ParentSidebarProps {
  activeTab: string;
  user: Parent;
  onTabChange: (tab: string) => void;
}

const ParentSidebar: React.FC<ParentSidebarProps> = ({ activeTab, user, onTabChange }) => {
  const unreadNotifications = user.notifications.filter(n => !n.read).length;
  
  return (
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
          onClick={() => onTabChange("overview")}
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
          onClick={() => onTabChange("send")}
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
          onClick={() => onTabChange("fixed-deposit")}
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
          onClick={() => onTabChange("activity")}
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
          onClick={() => onTabChange("allowance")}
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
          onClick={() => onTabChange("notifications")}
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
  );
}

export default ParentSidebar;
