
import { useState } from "react";
import { 
  Calendar, 
  DollarSign, 
  Bell, 
  PieChart, 
  Repeat, 
  User, 
  ArrowRight, 
  ChartBar 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Parent } from "@/lib/types";

interface ParentSidebarProps {
  activeTab: string;
  user: Parent;
  onTabChange: (tab: string) => void;
}

const navItems = [
  {
    title: "Overview",
    icon: <PieChart size={20} />,
    value: "overview"
  },
  {
    title: "Send Money",
    icon: <DollarSign size={20} />,
    value: "send"
  },
  {
    title: "Create FD",
    icon: <ArrowRight size={20} />,
    value: "fixed-deposit"
  },
  {
    title: "Activity Approval",
    icon: <User size={20} />,
    value: "activity"
  },
  {
    title: "Allowance Rules",
    icon: <Repeat size={20} />,
    value: "allowance"
  },
  {
    title: "Monthly Report",
    icon: <ChartBar size={20} />,
    value: "monthly-report"
  },
  {
    title: "Notifications",
    icon: <Bell size={20} />,
    value: "notifications"
  },
];

const ParentSidebar: React.FC<ParentSidebarProps> = ({ 
  activeTab, 
  user, 
  onTabChange 
}) => {
  const unreadNotifications = user.notifications.filter(n => !n.read).length;
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="w-full md:w-64 md:min-w-64 bg-card rounded-lg border p-4">
      <button
        className="md:hidden w-full flex justify-between items-center mb-2 text-sm"
        onClick={() => setExpanded(!expanded)}
      >
        <span>{expanded ? "Hide" : "Show"} Menu</span>
        <Calendar size={16} className={cn("transition-transform", expanded ? "rotate-180" : "")} />
      </button>
      
      <div className={cn("space-y-1", expanded ? "block" : "hidden md:block")}>
        {navItems.map((item) => (
          <button
            key={item.value}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left",
              activeTab === item.value
                ? "bg-sprout-purple/10 text-sprout-purple font-medium"
                : "hover:bg-muted"
            )}
            onClick={() => onTabChange(item.value)}
          >
            {item.icon}
            <span>{item.title}</span>
            {item.value === "notifications" && unreadNotifications > 0 && (
              <span className="ml-auto bg-sprout-purple text-white text-xs px-2 py-0.5 rounded-full">
                {unreadNotifications}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ParentSidebar;
