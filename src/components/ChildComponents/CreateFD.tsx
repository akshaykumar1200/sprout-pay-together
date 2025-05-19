
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, PiggyBank, ArrowRight } from "lucide-react";

const ChildCreateFD: React.FC = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("6");
  const [interestRate, setInterestRate] = useState("7.5");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !duration) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Check if amount is within balance
    if (parseFloat(amount) > 5000) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough money for this fixed deposit",
        variant: "destructive",
      });
      return;
    }
    
    // Mock creating FD request
    toast({
      title: "Request sent!",
      description: "Your Fixed Deposit request has been sent to your parent for approval",
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
          <PiggyBank className="h-5 w-5 text-sprout-blue" />
          <CardTitle>Create Fixed Deposit</CardTitle>
        </div>
        <CardDescription>
          Grow your savings with a fixed deposit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <p className="text-xs text-muted-foreground">
              Your available balance: ₹5,000
            </p>
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
          
          <div className="mt-6 p-4 bg-sprout-gray-light/50 dark:bg-sprout-gray-dark/20 rounded-lg">
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
              <span className="font-semibold text-sprout-blue">₹{maturityAmount}</span>
            </div>
          </div>

          <Button type="submit" className="w-full btn-accent mt-6">
            Request Fixed Deposit
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChildCreateFD;
