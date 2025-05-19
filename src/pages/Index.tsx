
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RoleCard from "@/components/RoleCard";
import { Sprout } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"parent" | "child" | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/login?role=${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-sprout-purple/10 p-6">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sprout className="h-10 w-10 text-sprout-purple" />
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sprout-purple to-sprout-blue bg-clip-text text-transparent">
            Sprout Pay Together
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          The family-friendly financial app that grows with your children
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">I am a...</h2>

        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <RoleCard
            role="parent"
            selected={selectedRole === "parent"}
            onClick={() => setSelectedRole("parent")}
          />
          <RoleCard
            role="child"
            selected={selectedRole === "child"}
            onClick={() => setSelectedRole("child")}
          />
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="btn-primary px-10 py-6 text-lg"
            size="lg"
          >
            Continue
          </Button>
        </div>
      </div>
      
      <footer className="mt-16 text-sm text-muted-foreground">
        <p>© 2023 Sprout Pay Together. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
