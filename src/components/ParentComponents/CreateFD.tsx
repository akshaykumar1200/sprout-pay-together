
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, PiggyBank } from "lucide-react";
import { mockChildren } from "@/lib/mockData";

const CreateFD: React.FC = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("6");
  const [selectedChild, setSelectedChild] = useState(mockChildren[0]?.id || "");
  const [interestRate, setInterestRate] = useState("7.5");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedChild || !amount || !duration) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Mock creating FD
    toast({
      title: "Fixed Deposit Created!",
      description: `₹${amount} fixed deposit created for ${mockChildren.find(c => c.id === selectedChild)?.name} at ${interestRate}% for ${duration} months`,
    });
    
    // Reset form
    setAmount("");
    setDuration("6");
  };
  
  // Calculate maturity amount
  const calculateMaturity = () => {
    if (!amount || !duration || !interestRate) return 0;
    const principal = parseFloat(amount);
    const rate = parseFloat(interestRate) / 100;
    const time = parseFloat(duration) / 12; // Convert months to years
    
    return principal * (1 + (rate * time));
  };

  const maturityAmount = calculateMaturity().toFixed(2);

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PiggyBank className="h-5 w-5 text-sprout-purple" />
          <CardTitle>Create Fixed Deposit</CardTitle>
        </div>
        <CardDescription>
          Set up a fixed deposit as a spending limit for your child
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="child">Select Child</Label>
            <select
              id="child"
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="input-field"
              required
            >
              <option value="" disabled>
                Select a child
              </option>
              {mockChildren.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={1000}
              className="input-field"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (months)</Label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="input-field"
              required
            >
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
            </select>
          </div>
          
          <div className="mt-6 p-4 bg-sprout-gray-light dark:bg-sprout-gray-dark/20 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm">Interest Rate:</span>
              <span className="font-semibold">{interestRate}%</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm">Maturity Date:</span>
              <span className="font-semibold flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(
                  Date.now() + parseInt(duration) * 30 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm">Maturity Amount:</span>
              <span className="font-semibold text-sprout-purple">₹{maturityAmount}</span>
            </div>
          </div>

          <Button type="submit" className="w-full btn-primary mt-6">
            Create Fixed Deposit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateFD;
