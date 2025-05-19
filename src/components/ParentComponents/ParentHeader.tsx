import React from "react";
import { Bell, LogOut, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Parent } from "@/lib/types";

interface ParentHeaderProps {
  user: Parent;
  onTabChange: (tab: string) => void;
}

const ParentHeader: React.FC<ParentHeaderProps> = ({ user, onTabChange }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PiggyBank className="h-8 w-8 text-sprout-purple" />
          <h1 className="text-xl font-bold">Sprout Pay Together</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            className="relative"
            onClick={() => onTabChange("notifications")}
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
  );
}

export default ParentHeader;
