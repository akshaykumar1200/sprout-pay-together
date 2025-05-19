
import React from "react";
import { cn } from "@/lib/utils";
import { User, Users } from "lucide-react";

interface RoleCardProps {
  role: "parent" | "child";
  selected: boolean;
  onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, selected, onClick }) => {
  return (
    <div
      className={cn(
        "relative w-full max-w-xs p-6 rounded-2xl text-center transition-all duration-300 cursor-pointer transform hover:scale-105",
        role === "parent"
          ? "parent-card"
          : "child-card",
        selected && "ring-4 ring-white dark:ring-white/50"
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-white/20 rounded-full">
          {role === "parent" ? (
            <Users className="h-12 w-12" />
          ) : (
            <User className="h-12 w-12" />
          )}
        </div>

        <h3 className="text-2xl font-bold">
          I'm a {role === "parent" ? "Parent" : "Child"}
        </h3>

        <p className="text-sm opacity-80">
          {role === "parent"
            ? "Manage your child's spending, set allowances, and help them learn about money"
            : "Learn about money, save for your goals, and spend responsibly with parental guidance"}
        </p>

        {selected && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-sprout-purple text-sm font-semibold py-1 px-4 rounded-full">
            Selected
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleCard;
