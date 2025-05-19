
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Target, Plus, Trash2, Award, BadgeCheck } from "lucide-react";

interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  created: Date;
}

const initialGoals: SavingsGoal[] = [
  {
    id: "goal1",
    name: "New Smartphone",
    target: 15000,
    current: 8750,
    created: new Date(2023, 3, 12),
  },
  {
    id: "goal2",
    name: "School Trip",
    target: 5000,
    current: 4200,
    created: new Date(2023, 4, 5),
  },
];

const SavingsGoalComponent: React.FC = () => {
  const { toast } = useToast();
  const [goals, setGoals] = useState<SavingsGoal[]>(initialGoals);
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [addAmount, setAddAmount] = useState<Record<string, string>>({});
  const [showCongrats, setShowCongrats] = useState(false);
  const [completedGoal, setCompletedGoal] = useState<SavingsGoal | null>(null);

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newGoalName.trim() || !newGoalTarget) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const targetAmount = parseFloat(newGoalTarget);
    
    if (isNaN(targetAmount) || targetAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid target amount",
        variant: "destructive",
      });
      return;
    }
    
    const newGoal: SavingsGoal = {
      id: `goal${Date.now()}`,
      name: newGoalName.trim(),
      target: targetAmount,
      current: 0,
      created: new Date(),
    };
    
    setGoals((prev) => [...prev, newGoal]);
    setNewGoalName("");
    setNewGoalTarget("");
    setShowNewGoalForm(false);
    
    toast({
      title: "Goal created!",
      description: `New goal "${newGoalName}" has been created`,
    });
  };

  const handleAddToGoal = (goalId: string) => {
    const amount = parseFloat(addAmount[goalId] || "0");
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }
    
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          const newAmount = goal.current + amount;
          const completed = newAmount >= goal.target;
          
          // If goal is completed, show congratulations
          if (completed && newAmount <= goal.target * 1.5) {
            setShowCongrats(true);
            setCompletedGoal({...goal, current: newAmount});
            setTimeout(() => {
              setShowCongrats(false);
              setCompletedGoal(null);
            }, 5000);
          }
          
          return {
            ...goal,
            current: newAmount,
          };
        }
        return goal;
      })
    );
    
    setAddAmount((prev) => ({
      ...prev,
      [goalId]: "",
    }));
    
    toast({
      title: "Amount added!",
      description: `₹${amount} added to your goal`,
    });
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
    
    toast({
      title: "Goal deleted",
      description: "Your savings goal has been deleted",
    });
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-sprout-blue" />
          <CardTitle>Savings Goals</CardTitle>
        </div>
        <CardDescription>
          Set savings goals and track your progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showCongrats && completedGoal && (
          <div className="bg-gradient-to-r from-sprout-blue to-sprout-purple p-4 rounded-lg mb-6 text-white text-center animate-scale-in">
            <div className="flex justify-center mb-2">
              <BadgeCheck className="h-12 w-12 text-yellow-300" />
            </div>
            <h3 className="text-xl font-bold mb-1">Goal Achieved! 🎉</h3>
            <p>Congratulations! You've reached your savings goal for:</p>
            <p className="font-semibold text-lg mt-1">{completedGoal.name}</p>
            <p className="mt-2 text-sm opacity-80">Keep up the great work!</p>
          </div>
        )}

        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{goal.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDeleteGoal(goal.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>
                    ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                  </span>
                </div>
                
                <Progress 
                  value={calculateProgress(goal.current, goal.target)} 
                  className="h-2 bg-sprout-gray-light"
                />
              </div>
              
              <div className="flex gap-2 mt-4">
                <Input
                  type="number"
                  placeholder="Amount"
                  className="input-field max-w-[120px]"
                  value={addAmount[goal.id] || ""}
                  onChange={(e) =>
                    setAddAmount((prev) => ({
                      ...prev,
                      [goal.id]: e.target.value,
                    }))
                  }
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs bg-sprout-blue/10 text-sprout-blue border-sprout-blue/30 hover:bg-sprout-blue/20"
                  onClick={() => handleAddToGoal(goal.id)}
                >
                  Add Money
                </Button>
              </div>
            </div>
          ))}
        </div>

        {showNewGoalForm ? (
          <form onSubmit={handleCreateGoal} className="mt-6 border rounded-lg p-4">
            <h3 className="font-medium mb-4">Create New Goal</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name"
                  placeholder="e.g., New Smartphone"
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal-amount">Target Amount (₹)</Label>
                <Input
                  id="goal-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(e.target.value)}
                  min={1}
                  className="input-field"
                  required
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowNewGoalForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 btn-accent"
              >
                Create Goal
              </Button>
            </div>
          </form>
        ) : (
          <Button
            onClick={() => setShowNewGoalForm(true)}
            className="w-full mt-6 btn-accent flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New Goal
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SavingsGoalComponent;
