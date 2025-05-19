
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Target, ArrowRight, CalendarDays, Plus, Trash2 } from "lucide-react";
import { mockChildren } from "@/lib/mockData";
import { Progress } from "@/components/ui/progress";

const SavingsGoal: React.FC = () => {
  const { toast } = useToast();
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    deadline: "",
  });
  const [goals, setGoals] = useState(mockChildren[0]?.savingsGoals || []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.targetAmount) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Add new goal
    const newGoal = {
      id: `sg${goals.length + 1}`,
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: 0,
      deadline: formData.deadline || undefined,
    };
    
    setGoals([...goals, newGoal]);
    
    toast({
      title: "Savings goal created!",
      description: `You've created a new savings goal: ${formData.name}`,
    });
    
    // Reset form
    setFormData({
      name: "",
      targetAmount: "",
      deadline: "",
    });
    setShowNewGoalForm(false);
  };

  const handleDelete = (id: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
    toast({
      title: "Goal deleted",
      description: "Your savings goal has been deleted",
    });
  };

  const handleAddMoney = (id: string) => {
    // Mock adding money to savings goal
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === id) {
          const addedAmount = 500; // This would come from a form input in a real app
          const newAmount = Math.min(goal.currentAmount + addedAmount, goal.targetAmount);
          
          return {
            ...goal,
            currentAmount: newAmount,
          };
        }
        return goal;
      })
    );
    
    toast({
      title: "Money added to goal!",
      description: "You've added ₹500 to your savings goal",
    });
  };

  const calculateProgress = (current: number, target: number) => {
    return (current / target) * 100;
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-sprout-blue" />
            <CardTitle>Savings Goals</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNewGoalForm(!showNewGoalForm)}
            className="h-8 w-8 rounded-full bg-sprout-blue/10 text-sprout-blue hover:bg-sprout-blue/20"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Set goals and track your progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {showNewGoalForm && (
          <Card className="border border-dashed border-sprout-blue/40 bg-sprout-blue/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">New Savings Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Goal Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="What are you saving for?"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Target Amount (₹)</Label>
                  <Input
                    id="targetAmount"
                    name="targetAmount"
                    type="number"
                    placeholder="How much do you need?"
                    value={formData.targetAmount}
                    onChange={handleChange}
                    min={100}
                    className="input-field"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline" className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Target Date (optional)
                  </Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewGoalForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="btn-accent">
                    Create Goal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {goals.length === 0 && !showNewGoalForm ? (
          <div className="text-center py-10">
            <Target className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No savings goals yet</p>
            <Button
              className="mt-4 btn-accent"
              onClick={() => setShowNewGoalForm(true)}
            >
              Create Your First Goal
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{goal.name}</h3>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(goal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress: {Math.round(calculateProgress(goal.currentAmount, goal.targetAmount))}%</span>
                    <span>
                      ₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={calculateProgress(goal.currentAmount, goal.targetAmount)}
                    className="h-2 bg-sprout-gray-light"
                    indicatorClassName="bg-sprout-blue"
                  />
                </div>

                {goal.deadline && (
                  <p className="text-xs flex items-center gap-1 mt-2 text-muted-foreground">
                    <CalendarDays className="h-3 w-3" /> Target date:{" "}
                    {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                )}

                <div className="mt-3 pt-2 border-t flex justify-end">
                  <Button
                    size="sm"
                    className="text-xs bg-sprout-blue hover:bg-sprout-blue/90"
                    onClick={() => handleAddMoney(goal.id)}
                  >
                    Add Money
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavingsGoal;
