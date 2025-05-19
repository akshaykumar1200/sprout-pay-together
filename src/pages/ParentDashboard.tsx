
import React, { useState } from "react";
import { mockParents } from "@/lib/mockData";
import ParentHeader from "@/components/ParentComponents/ParentHeader";
import ParentSidebar from "@/components/ParentComponents/ParentSidebar";
import ParentOverview from "@/components/ParentComponents/ParentOverview";
import SendMoney from "@/components/ParentComponents/SendMoney";
import CreateFD from "@/components/ParentComponents/CreateFD";
import ActivityApproval from "@/components/ParentComponents/ActivityApproval";
import AllowanceRules from "@/components/ParentComponents/AllowanceRules";
import NotificationCenter from "@/components/ParentComponents/NotificationCenter";
import MonthlyReport from "@/components/ParentComponents/MonthlyReport";

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const user = mockParents[0];
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-sprout-purple/5">
      <ParentHeader user={user} onTabChange={handleTabChange} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <ParentSidebar 
            activeTab={activeTab}
            user={user}
            onTabChange={handleTabChange}
          />
          
          {/* Main Content */}
          <div className="flex-grow">
            {activeTab === "overview" && <ParentOverview user={user} onTabChange={handleTabChange} />}
            {activeTab === "send" && <SendMoney />}
            {activeTab === "fixed-deposit" && <CreateFD />}
            {activeTab === "activity" && <ActivityApproval />}
            {activeTab === "allowance" && <AllowanceRules />}
            {activeTab === "notifications" && <NotificationCenter />}
            {activeTab === "monthly-report" && <MonthlyReport user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
